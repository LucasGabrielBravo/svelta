import slugify from "slugify";

export function simplify(value: string) {
  const simplifyString = slugify(value, {
    lower: true,  
    strict: true, 
    locale: 'pt'  
  });

  return simplifyString
}