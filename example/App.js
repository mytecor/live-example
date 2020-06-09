
import 'rmce/index.css'
import './main.styl'

import React from 'react'
import ReactDOM from 'react-dom'
import { LiveExample, Editor, Preview } from '../src'

let bindings = {LiveExample, Editor, Preview}

function Example(props) {
	let code = `() => {
	function CustomButton({children}) {
		return <button style={{color: 'red'}}>{children}</button>
	}

	let bindings = {CustomButton}

	return <LiveExample id='example'>
		<Editor className='code-editor' value={'<CustomButton>TEST</CustomButton>'}/>
		<Preview id='preview' bindings={bindings}/>
	</LiveExample>
}`
	return <LiveExample>
	<Editor className='code-editor' value={code}/>
	<p>Result</p>
	<Preview bindings={bindings}/>
</LiveExample>
}


import Prism from 'prismjs'
import 'prismjs/components/prism-bash'

function Code({children, lang, inline}) {
	return <code className={'code-editor' + (inline ? ' inline' : '')} dangerouslySetInnerHTML={{__html: lang? Prism.highlight(children, Prism.languages[lang]) : children}}/>
}

ReactDOM.render(<>
	<header>
		<h1>live-example</h1>
		<p>React live code preview</p>
		<a href='https://github.com/midnightcoder-pro/live-example'>github</a>
	</header>
	<p>Like <a href='https://github.com/FormidableLabs/react-live'>react-live</a>, but much faster, smaller and customizable</p>
	<p>Install</p>
	<div id='install'>
		<Code lang='bash'>yarn add live-example</Code>
		<Code lang='bash'>npm install live-example</Code>
	</div>
	<p>Import</p>
	<Code lang='jsx'>{`import { LiveExample, Editor, Preview } from 'live-example'
import 'rmce/index.css'`}</Code>
	<p>Usage example (Playground)</p>
	<Example/>

	<p>Also you can use class components and raw jsx</p>

	<Code lang='jsx'>{`class extends React.Component {
	render() {
		return '<button>TEST</button>'
	}
}
// or
<button>TEST</button>`}
</Code>
	<p>Props</p>

	<p><b>{'<Editor/>'}</b> props</p>
	<ul>
		<li><Code inline>value</Code> (String): Current value of code to display. This should be a controlled prop</li>
		<li><Code inline>onChange</Code> (Function): On code change callback</li>
	</ul>

	<p><b>{'<Preview/>'}</b> props</p>
	<ul>
		<li><Code inline>bindings</Code> (Object): Custom globals that the code can use</li>
		<li><Code inline>onError</Code> (Function): On error callback</li>
	</ul>
</>, document.getElementById('root'))
