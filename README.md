# rmce
###### React mini code editor

[In action](https://midnightcoder-pro.github.io/rmce)

#### Usage example (with prismjs)
```jsx
import CodeEditor from 'rmce'
// editor theme
import '~rmce/index.css'
import Prism from 'prismjs'
// add jsx language support
import 'prismjs/components/prism-jsx'
import React from 'react'

function MyFancyEditor() {
	let [code, setCode] = React.useState('<div>test</div>')
	return <CodeEditor
		className='code-editor'
		highlight={code => Prism.highlight(code, Prism.languages.jsx)}
		value={code}
		onChange={setCode}
		/>
}
```

#### Props

- `value` (String): Current value of the editor i.e. the code to display. This must be a controlled prop
- `onChange` (Function): Callback which is called when the value of the editor changes
- `highlight` (Function): Callback which will receive code to highlight. You'll need to return an HTML string or a React element with syntax highlighting using a library such as prismjs