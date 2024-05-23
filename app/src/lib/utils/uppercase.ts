const UPPERCASE_PREFIX = '^{'
const UPPERCASE_SUFFIX = '}^'

export function encodeUpperCase(str: string): string {
	return str.replace(/([A-Z]+)/g, `${UPPERCASE_PREFIX}$1${UPPERCASE_SUFFIX}`)
}

export function decodeUpperCase(str: string): string {
	const escapeRegExp = (escape: string) => ['', ...escape.split('')].join('\\')

	return str.replace(
		new RegExp(`${escapeRegExp(UPPERCASE_PREFIX)}(.*?)${escapeRegExp(UPPERCASE_SUFFIX)}`, 'g'),
		(_, p1: string) => p1.toUpperCase()
	)
}
