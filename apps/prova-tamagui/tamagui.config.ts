import { createTamagui } from 'tamagui'
console.log('my tamagui.config.ts')
const config = createTamagui({
	defaultTheme: 'light',
	shorthands: {
		px: 'paddingHorizontal',
	},
	themes: {
		light: {
			bg: '#fff',
			color: '#000'
		}
	},
	//@ts-ignore
	tokens: {
		// ... see Themes docus
	},
	media: {
		xs: { maxWidth: 660 },
		gtXs: { minWidth: 660 + 1 },
		sm: { maxWidth: 860 },
		gtSm: { minWidth: 860 + 1 },
		md: { minWidth: 980 },
		gtMd: { minWidth: 980 + 1 },
		short: { maxHeight: 820 },
		tall: { minHeight: 820 },
		hoverNone: { hover: 'none' },
		pointerCoarse: { pointer: 'coarse' },
	},
})

type Conf = typeof config

declare module 'tamagui' {
	//@ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface TamaguiCustomConfig extends Conf {

	}
}

export default config
