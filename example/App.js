
import React from 'react'
import ReactDOM from 'react-dom'

import Compiler from '../src'
import CodeEditor from 'rmce'

import './main.styl'

// Languages support
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-typescript'


function Code({children, lang}) {
	return <CodeEditor className='rmce' value={children} readOnly language={lang}/>
}

let bindings = { React, Compiler, CodeEditor }

function Fallback({error}) {
	return <div className='error'>{error.message}</div>
}





function Install() {
	return <>
		<h3>Install</h3>
		<div id='install'>
			<Code lang='bash'>yarn add live-example</Code>
			<Code lang='bash'>npm add live-example</Code>
		</div>
	</>
}

function Imports() {
	return <>
		<h3>Imports</h3>
		<Code lang='jsx'>{`import React from 'react'
import Compiler from 'live-example'
import CodeEditor from 'rmce'
import 'rmce/index.css'`}</Code>
	</>
}

function Playground() {
	let [code, setCode] = React.useState(`() => {
	let [code, setCode] = React.useState('<CustomButton>TEST</CustomButton>')

	function CustomButton({children}) {
		return <button style={{color: 'red'}}>{children}</button>
	}

	function Fallback({error}) {
		return <div className='error'>{error.message}</div>
	}

	let bindings = { CustomButton }

	return <div id='example'>
		<CodeEditor language='jsx' className='rmce' value={code} onChange={setCode}/>
		<div id='preview'>
			<Compiler code={code} bindings={bindings} fallback={Fallback}/>
		</div>
	</div>
}`)

	return <>
		<h3>Playground</h3>
		<CodeEditor className='rmce' value={code} onChange={setCode} language='jsx'/>
		<h3>Result</h3>
		<Compiler code={code} bindings={bindings} fallback={Fallback}/>
	</>
}

function Props() {
	return <>
		<h3>Props:</h3>
		<Code lang='ts'>{`class Props {
	// Current value of the code to compile
	code: string = ''

	// Bindings provided for sucrase
	bindings: object = {}

	// Fallback component
	fallback: ComponentClass<FallbackProps> | FunctionComponent<FallbackProps> = () => null
}`}</Code>
	</>
}

ReactDOM.render(<>
	<header>
		<h1>live-example</h1>
		<p>React live code preview</p>
		<a href='https://github.com/mytecor/live-example'>github</a>
	</header>
	<p>Like <a href='https://github.com/FormidableLabs/react-live'>react-live</a>, but much faster, smaller and customizable</p>

	<Install/>
	<Imports/>

	<Playground/>
	<p>Also you can use class components and raw jsx</p>

		<Code lang='jsx'>{`class extends React.Component {
	render() {
		return <button>TEST</button>
	}
}
// or
<button>TEST</button>`}</Code>

	<Props/>
</>, document.getElementById('root'))
