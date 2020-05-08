import 'typeface-jetbrains-mono'
import 'prismjs/themes/prism.css'

import { CacheProvider } from '@emotion/core'
import { myCache } from './src/utils/create-emotion-cache'

export const wrapRootElement = ({ element }) => (
	<CacheProvider value={myCache}>{element}</CacheProvider>
)
