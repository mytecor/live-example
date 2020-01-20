# live-example
###### React live code preview

Like react-live, but much faster, smaller and customizable

[In action](https://midnightcoder-pro.github.io/live-example)

#### Usage example
```jsx
import { LiveExample, Editor, Preview } from 'live-example'
import 'rmce/index.css'

function CustomButton({children}) {
	return <button style={{color: 'red'}}>{children}</button>
}

let bindings = {CustomButton}

<LiveExample>
	<Editor value={'<CustomButton>TEST</CustomButton>'}/>
	<Preview bindings={bindings}/>
</LiveExample>
```

##### Also you can use class components and raw jsx

```jsx
class extends React.Component {
	render() {
		return '<button>TEST</button>'
	}
}
// or
<button>TEST</button>
```

#### Props

##### `<Preview/>` props

- `value` (String): Current value of code to display. This should be a controlled prop
- `onChange` (Function): On code change callback

##### `<Preview/>` props

- `bindings` (Object): Custom globals that the code can use
- `onError` (Function): On error callback