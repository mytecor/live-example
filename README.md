# live-example
###### React live code preview

[In action (Playground)](https://midnightcoder-pro.github.io/live-example)

#### Usage example
```js
import React from 'react'
import Compiler from 'live-example'
import CodeEditor from 'rmce'
import 'rmce/index.css'

function CustomButton({children}) {
	return <button style={{color: 'red'}}>{children}</button>
}

function Fallback({error}) {
	return <div className='error'>{error.message}</div>
}

let bindings = { CustomButton }

function MyFancyExample() {
	let [code, setCode] = React.useState('<CustomButton>TEST</CustomButton>')

	return <div id='example'>
		<CodeEditor language='jsx' className='rmce' value={code} onChange={setCode}/>
		<div id='preview'>
			<Compiler code={code} bindings={bindings} fallback={Fallback}/>
		</div>
	</div>
}

ReactDOM.render(<MyFancyExample/>, document.getElementById('root'))
```

##### Also you can use class components and raw jsx
```js
class extends React.Component {
	render() {
		return <button>TEST</button>
	}
}
// or
<button>TEST</button>
```

#### Props
```ts
class Props {
	// Current value of the code to compile
	code: string = ''

	// Bindings provided for sucrase
	bindings: object = {}

	// Fallback component
	fallback: ComponentClass<FallbackProps> | FunctionComponent<FallbackProps> = () => null
}
```