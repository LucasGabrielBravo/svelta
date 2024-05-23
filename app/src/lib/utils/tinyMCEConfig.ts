declare var tinymce: any;

export function tinyMCEConfig(props?: { max_height?: number, min_height?: number, headings?: boolean }) {
    const min_height = props?.min_height || 350
    const max_height = props?.max_height || 600
    const headings = props?.headings || false
    return {
        branding: false,
        promotion: false,
        menubar: false,
        min_height: min_height,
        height: 350,
        max_height: max_height,
        autoresize_bottom_margin: 30,
        skin: "pocketbase",
        content_style: "body { font-size: 14px }",
        plugins: [
            "autoresize",
            "autolink",
            "lists",
            "link",
            "image",
            "searchreplace",
            "fullscreen",
            "media",
            "table",
            "code",
            "codesample",
            "directionality",
        ],
        font_size_input_default_unit: "px",
        font_size_input_default: "14px",
        font_size_formats: '8px 10px 12px 14px 16px 18px 24px 36px 48px',
        toolbar: `fullscreen | fontsize | bold italic underline strikethrough subscript superscript | forecolor backcolor | ${(headings ? "styles | " : "")} aligncenter alignjustify alignleft alignright | blockquote | indent outdent lineheight | bullist numlist | link image media table codesample direction`,                
        file_picker_types: "image",
        // @see https://www.tiny.cloud/docs/tinymce/6/file-image-upload/#interactive-example
        file_picker_callback: (cb: any, value: any, meta: any) => {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");

            input.addEventListener("change", (e: any) => {
                const file = e.target.files[0];
                const reader = new FileReader();

                reader.addEventListener("load", () => {
                    if (!tinymce) {
                        return;
                    }

                    // We need to register the blob in TinyMCEs image blob registry.
                    // In future TinyMCE version this part will be handled internally.
                    const id = "blobid" + new Date().getTime();
                    const blobCache = tinymce.activeEditor.editorUpload.blobCache;
                    const base64 = (reader as any).result.split(",")[1];
                    const blobInfo = blobCache.create(id, file, base64);
                    blobCache.add(blobInfo);

                    // call the callback and populate the Title field with the file name
                    cb(blobInfo.blobUri(), { title: file.name });
                });

                reader.readAsDataURL(file);
            });

            input.click();
        },
        setup: (editor: any) => {
            editor.on('keydown', (e: any) => {
                // propagate save shortcut to the parent
                if ((e.ctrlKey || e.metaKey) && e.code == "KeyS" && editor.formElement) {
                    e.preventDefault();
                    e.stopPropagation();
                    editor.formElement.dispatchEvent(new KeyboardEvent("keydown", e));
                }
            });

            const lastDirectionKey = "tinymce_last_direction";

            // load last used text direction for blank editors
            editor.on('init', () => {
                const lastDirection = window?.localStorage?.getItem(lastDirectionKey);
                if (!editor.isDirty() && editor.getContent() == "" && lastDirection == "rtl") {
                    editor.execCommand("mceDirectionRTL");
                }
            });

            // text direction dropdown
            editor.ui.registry.addMenuButton("direction", {
                icon: "visualchars",
                fetch: (callback: any) => {
                    const items = [
                        {
                            type: "menuitem",
                            text: "LTR content",
                            icon: "ltr",
                            onAction: () => {
                                window?.localStorage?.setItem(lastDirectionKey, "ltr");
                                tinymce.activeEditor.execCommand("mceDirectionLTR");
                            }
                        },
                        {
                            type: "menuitem",
                            text: "RTL content",
                            icon: "rtl",
                            onAction: () => {
                                window?.localStorage?.setItem(lastDirectionKey, "rtl");
                                tinymce.activeEditor.execCommand("mceDirectionRTL");
                            }
                        }
                    ];

                    callback(items);
                }
            });
        },
    };
}