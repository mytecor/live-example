
import React from 'react'

let Context = React.createContext()

export function LiveExample({code, ...props}) {
	return <Context.Provider value={React.useState(code)}>
		<div {...props}/>
	</Context.Provider>
}


import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'

import CodeEditor from 'rmce'

export function Editor(props) {
	let [code, setCode] = React.useContext(Context)

	return <CodeEditor
		{...props}
		value={code}
		onChange={setCode}
		highlight={code => Prism.highlight(code, Prism.languages.jsx)}
		/>
}


import { transform } from 'buble'

export function Preview({bindings, ...props}) {
	let [code] = React.useContext(Context)
	
	try {
		let res = Function(
			'React,' + Object.keys(bindings),
			transform('return ' + code).code
		).call(null, React, ...Object.values(bindings))

		return <div {...props}>{typeof res == 'function'? res(): res}</div>
	} catch(e) {
		console.error(e)
		return null
	}
}

