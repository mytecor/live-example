
import { PropsWithChildren, HTMLAttributes, FunctionComponent, ComponentClass, ReactElement } from 'react'

interface FallbackProps extends PropsWithChildren {
  error: Error
}

interface CompillerWrapperProps extends HTMLAttributes {
  /** Current value of the code to compile */
  code?: string

  /** Bindings provided for sucrase */
  bindings?: object

  /** Fallback component */
  fallback?: ComponentClass<FallbackProps> | FunctionComponent<FallbackProps>
}

export default function CompillerWrapper(props: CompillerWrapperProps): ReactElement
