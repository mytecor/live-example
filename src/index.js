
import React from 'react'

let Context = React.createContext()

export let LiveExample = React.forwardRef(function LiveExample(props, ref) {
	return <Context.Provider value={React.useState('')}>
		<div {...props} ref={ref}/>
	</Context.Provider>
})


import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'

import CodeEditor from 'rmce'


let style = []
Prism.hooks.add('wrap', env => {
	env.classes = env.classes.map(cls => style[cls] || cls)
})

export let Editor = React.forwardRef(function Editor({value, onChange = () => {}, classNames = [], ...props}, ref) {
	let [code, setCode] = React.useContext(Context)

	React.useEffect(() => {
		setCode(value)
	}, [])

	return <CodeEditor
		{...props}
		ref={ref}
		value={value}
		onChange={code => {
			setCode(code)
			onChange(code)
		}}
		highlight={code => {
			style = classNames
			return Prism.highlight(code, Prism.languages.jsx)
		}}
		/>
})


import { transform } from 'sucrase-browser'

class ErrorHandler extends React.Component {
	static contextType = Context

	componentDidCatch() {}

	render() {
		let bindings = this.props.bindings || {}

		this.componentDidCatch = this.props.onError || console.error

		try {
			let El = Function(
				'React,' + Object.keys(bindings),
				transform('return ' + this.context[0], {transforms: ['jsx']}).code
			).call(null, React, ...Object.values(bindings))

			return typeof El == 'function'? <El/>: El || null
		} catch(e) {
			this.componentDidCatch(e)
			return null
		}
	}
}


export let Preview = React.forwardRef(function Preview({bindings, ...props}, ref) {	
	return <div ref={ref} {...props}><ErrorHandler bindings={bindings}/></div>
})
