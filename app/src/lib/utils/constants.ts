export type SectionGroupType = typeof sectionsGroups[number]['value']

export const sectionsGroups = [
  {value: 'Banner', label: 'Banners'},
  {value: 'Blog', label: 'Blog'},
  {value: 'Contact', label: 'Contato'},
  {value: 'Content', label: 'Conteúdo'},
  {value: 'CTA', label: 'CTA'},
  {value: 'FAQs', label: 'FAQs'},
  {value: 'Feature', label: 'Característica'},
  {value: 'Footer', label: 'Rodapé'},
  {value: 'Form', label: 'Formulário'},
  {value: 'Header', label: 'Cabeçalho de seções'},
  {value: 'Hero', label: 'Hero'},
  {value: 'Logo', label: 'Logo'},
  {value: 'Navbar', label: 'Navegação'},
  {value: 'Pricing', label: 'Preços'},
  {value: 'Product', label: 'Produto'},
  {value: 'Stats', label: 'Estatísticas'},
  {value: 'Team', label: 'Time'},
  {value: 'Testimonials', label: 'Depoimentos'},
  {value: 'Others', label: 'Outros'}
] as const

export const accept = [
  "application/pdf",
  "application/msword",
  "application/vnd.ms-excel",
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/webp",
  "image/x-icon",
  "image/svg+xml",
  "video/ogg",
  "video/mpeg",
  "video/mp4",
  "video/webm",
  "text/plain",
  "application/zip",
  "application/json",
].join(",")

export const cookieName = "user-session"

export const fonts = [
  'Roboto',
  'Open Sans',
  'Noto Sans Japanese',
  'Montserrat',
  'Lato',
  'Poppins',
  'Inter',
  'Roboto Condensed',
  'Oswald',
  'Raleway',
  'Noto Sans',
  'Nunito Sans',
  'Nunito',
  'Ubuntu',
  'Rubik',
  'Noto Sans Korean',
  'Kanit',
  'PT Sans',
  'Work Sans',
  'Noto Sans Traditional Chinese',
  'Fira Sans',
  'IBM Plex Sans',
  'Mulish',
  'DM Sans',
  'Barlow',
  'Quicksand',
  'Titillium Web',
  'Manrope',
  'Karla',
  'Libre Franklin',
  'Josefin Sans',
  'Mukta',
  'Arimo',
  'Dosis',
  'Bebas Neue',
  'Hind Siliguri',
  'Cabin',
  'PT Sans Narrow',
  'Anton',
  'Cairo',
  'Barlow Condensed',
  'Assistant',
  'Oxygen',
  'Noto Sans Simplified Chinese',
  'Jost',
  'Hind',
  'Lobster',
  'Archivo',
  'Exo 2',
  'Space Grotesk',
  'Comfortaa',
  'Teko',
  'Prompt',
  'Rajdhani',
  'Outfit',
  'Fjalla One',
  'Signika Negative',
  'Maven Pro',
  'Varela Round',
  'Red Hat Display',
  'M PLUS Rounded 1c',
  'Overpass',
  'Public Sans',
  'Asap',
  'Merriweather Sans',
  'Play',
  'Fira Sans Condensed',
  'Noto Sans Hong Kong',
  'Chakra Petch',
  'Questrial',
  'Barlow Semi Condensed',
  'Signika',
  'Lexend',
  'Asap Condensed',
  'Catamaran',
  'Lilita One',
  'Source Sans 3',
  'Yanone Kaffeesatz',
  'IBM Plex Sans Arabic',
  'Didact Gothic',
  'Archivo Narrow',
  'Sarabun',
  'M PLUS 1p',
  'Figtree',
  'Roboto Slab',
  'Slabo 27px',
  'Rokkitt',
  'Sanchez',
  'Aleo',
  'Glegoo',
  'Bevan',
  'BioRhyme',
  'Kameron',
  'Hepta Slab',
  'Slabo 13px',
  'Cutive',
  'Stint Ultra Condensed',
  'BhuTuka Expanded One',
  'Besley',
  'Peralta',
  'Montagu Slab',
  'Zilla Slab Highlight',
  'Stint Ultra Expanded',
  'Arbutus',
  'Wellfleet',
  'BioRhyme Expanded',
  'Kay Pho Du',
  'Padyakke Expanded One',
  'Playfair Display', 
  'Merriweather', 
  'Lora', 
  'PT Serif', 
  'Noto Serif', 
  'Libre Baskerville', 
  'Bitter', 
  'EB Garamond', 
  'DM Serif Display', 
  'Crimson Text', 
  'Abril Fatface', 
  'Cormorant Garamond', 
  'Zilla Slab', 
  'Domine', 
  'IBM Plex Serif', 
  'Crimson Pro', 
  'Vollkorn', 
  'Bree Serif', 
  'Cinzel', 
  'Source Serif 4', 
  'Alegreya', 
  'Frank Ruhl Libre', 
  'Cormorant', 
  'Tinos', 
  'Alfa Slab One', 
  'Neuton', 
  'Spectral', 
  'Martel', 
  'Amiri', 
  'Cardo', 
  'Noticia Text', 
  'Crete Round', 
  'Bodoni Moda', 
  'Marcellus', 
  'Sawarabi Mincho', 
  'Alice', 
  'Old Standard TT', 
  'Eczar', 
  'Unna', 
  'Roboto Serif', 
  'Mate', 
  'Quattrocento', 
  'Gelasio', 
  'Faustina', 
  'Literata', 
  'DM Serif Text', 
  'Mate SC', 
  'Yeseva One', 
  'Petrona', 
  'Playfair Display SC', 
  'Baskervville', 
  'Abhaya Libre', 
  'Libre Caslon Text', 
  'Noto Naskh Arabic', 
  'Taviraj', 
  'Courier Prime', 
  'Noto Serif Bengali', 
  'Calistoga', 
  'Castoro', 
  'Playfair', 
  'Sorts Mill Goudy', 
  'Shippori Mincho', 
  'Forum', 
  'Zen Maru Gothic', 
  'Gilda Display', 
  'Rufina', 
  'Laila', 
  'Fraunces', 
  'Shrikhand', 
  'Cutive Mono', 
  'Pridi', 
  'Karma', 
  'Newsreader', 
  'STIX Two Text', 
  'Amita', 
  'Kurale', 
  'Berkshire Swash', 
  'Noto Serif Devanagari', 
  'Libre Bodoni', 
  'Yrsa', 
  'PT Serif Caption', 
  'Quintessential', 
  'Fredericka the Great', 
  'Corben',
].sort((a, b) => a.localeCompare(b))