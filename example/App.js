
import 'rmce/index.css'
import './main.styl'

import React from 'react'
import ReactDOM from 'react-dom'
import { LiveExample, Editor, Preview } from '../src'

let bindings = {LiveExample, Editor, Preview}

function Playground(props) {
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
		<p>Playground</p>
		<Editor className='code-editor' value={code}/>
		<p>Result</p>
		<Preview bindings={bindings}/>
	</LiveExample>
}


import Prism from 'prismjs'
import 'prismjs/components/prism-bash'

function Code({children, lang}) {
	return <code className='code-editor' dangerouslySetInnerHTML={{__html: lang? Prism.highlight(children, Prism.languages[lang]) : children}}/>
}


function Import() {
	return <>
		<p>Import</p>
		<Code lang='jsx'>{`import { LiveExample, Editor, Preview } from 'live-example'
import 'rmce/index.css'`}</Code>
	</>
}


function Install() {
	return <>
		<p>Install</p>
		<div id='install'>
			<Code lang='bash'>yarn add live-example</Code>
			<Code lang='bash'>npm install live-example</Code>
		</div>
	</>
}

function Example1() {
	return <>
		<p>Also you can use class components and raw jsx</p>

		<Code lang='jsx'>{`class extends React.Component {
	render() {
		return '<button>TEST</button>'
	}
}
// or
<button>TEST</button>`}
	</Code>
	</>
}


function Example2() {
	return <>
		<p>Custom class names</p>

		<Code lang='jsx'>{`import style from './mystyle'
or
let style = {
	token: 'mytoken',
	keyword: 'mykeyword'
}

...

<Editor classNames={style}/>
`}
	</Code>
	</>
}

function Props() {
	return <div id='props'>
		<p>Props</p>
		
		<p><b>{'<Editor/>'}</b> props</p>
		<ul>
			<li><Code>value</Code> (String): Current value of code to display. This should be a controlled prop</li>
			<li><Code>onChange</Code> (Function): On code change callback</li>
			<li><Code>classNames</Code> (Object): Accets a list of theme classes</li>
		</ul>
		
		<p><b>{'<Preview/>'}</b> props</p>
		<ul>
			<li><Code>bindings</Code> (Object): Custom globals that the code can use</li>
			<li><Code>onError</Code> (Function): On error callback</li>
		</ul>
	</div>
}


ReactDOM.render(<>
	<header>
		<h1>live-example</h1>
		<p>React live code preview</p>
		<a href='https://github.com/midnightcoder-pro/live-example'>github</a>
	</header>
	<p>Like <a href='https://github.com/FormidableLabs/react-live'>react-live</a>, but much faster, smaller and customizable</p>
	
	<Install/>
	<Import/>
	
	<Playground/>
	<Example1/>
	<Example2/>
	<Props/>
</>, document.getElementById('root'))

