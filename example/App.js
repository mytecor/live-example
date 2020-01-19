
import 'rmce/src/index.styl'
import './main.styl'

import { LiveExample, Editor, Preview } from '../src'

function Example(props) {
	let [code, setCode] = React.useState(`import CodeEditor from 'rmce'
// editor theme
import 'rmce/index.css'
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
}`)

	return <LiveExample className='example' code={children}>
		<Preview className='preview' bindings={bindings}/>
		<Editor className='code-editor'/>
	</LiveExample>
}

function Code({children, lang, inline}) {
	return <code className={'code-editor' + (inline ? ' inline' : '')} dangerouslySetInnerHTML={{__html: lang? Prism.highlight(children, Prism.languages[lang]) : children}}/>
}

ReactDOM.render(<>
	<header>
		<h1>rmce</h1>
		<p>React mini code editor</p>
		<a href='https://github.com/midnightcoder-pro/rmce'>github</a>
	</header>
	<p>Install</p>
	<div id='install'>
		<Code lang='bash'>yarn add rmce</Code>
		<Code lang='bash'>npm install rmce</Code>
	</div>
	<p>Usage example (with prismjs)</p>
	<Example/>
	
	<p>Props</p>
	<ul id='props'>
		<li><Code inline>value</Code> (String): Current value of the editor i.e. the code to display. This must be a controlled prop</li>
		<li><Code inline>onChange</Code> (Function): Callback which is called when the value of the editor changes</li>
		<li><Code inline>highlight</Code> (Function): Callback which will receive code to highlight. You'll need to return an HTML string or a React element with syntax highlighting using a library such as prismjs</li>
	</ul>
</>, document.getElementById('root'))
