
import { ErrorBoundary } from 'react-error-boundary'
import { transform } from 'sucrase-browser'
import React from 'react'

export default function CompilerWrapper({fallback = () => null, code, bindings}) {
	return <ErrorBoundary FallbackComponent={fallback} resetKeys={[code]}>
		<Compiler code={code} bindings={bindings}/>
	</ErrorBoundary>
}

function Compiler({code, bindings = {}}) {
	let El = Function(
		'React,' + Object.keys(bindings),
		transform('return ' + code.trim(), {transforms: ['jsx']}).code
	).call(null, React, ...Object.values(bindings))

	return typeof El == 'function'? <El/>: El
}