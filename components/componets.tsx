"use client"

import React, { ReactNode, Ref, PropsWithChildren } from 'react'
import ReactDOM from 'react-dom'
import { cx, css } from '@emotion/css'

interface BaseProps {
  className?: string
  [key: string]: unknown
}

// Slate 관련 타입 정의
interface SlateNode {
  text?: string
  [key: string]: unknown
}

interface SlateNodeList {
    map<T>(callback: (node: SlateNode) => T): {
      toArray(): T[]
    }
  }

interface SlateValue {
    document: {
      nodes: SlateNodeList
    }
  }

export const Button = React.forwardRef<HTMLSpanElement, PropsWithChildren<{active: boolean, reversed: boolean, onMouseDown: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void} & BaseProps>>(
  (
    {
      className,
      active,
      reversed,
      onMouseDown,
      ...props
    },
    ref
  ) => (
    <span
      {...props}
      ref={ref}

      

      className={cx(
        className,
        css`
          cursor: pointer;
          color: ${reversed
            ? active
              ? 'white'
              : '#aaa'
            : active
            ? 'black'
            : '#ccc'};
        `
      )} onMouseDown={(e)=>{
        onMouseDown(e);
      }}
    />
  )
)

export const EditorValue = React.forwardRef<HTMLDivElement, PropsWithChildren < {value: SlateValue} & BaseProps>>(
  (
    {
      className,
      value,
      ...props
    },
    ref
  ) => {
    const textLines = value.document.nodes
      .map(node => node.text || '')
      .toArray()
      .join('\n')
    return (
      <div
        ref={ref}
        {...props}
        className={cx(
          className,
          css`
            margin: 30px -20px 0;
          `
        )}
      >
        <div
          className={css`
            font-size: 14px;
            padding: 5px 20px;
            color: #404040;
            border-top: 2px solid #eeeeee;
            background: #f8f8f8;
          `}
        >
          Slate's value as text
        </div>
        <div
          className={css`
            color: #404040;
            font: 12px monospace;
            white-space: pre-wrap;
            padding: 10px 20px;
            div {
              margin: 0 0 0.5em;
            }
          `}
        >
          {textLines}
        </div>
      </div>
    )
  }
)

// export const Icon = React.forwardRef<HTMLSpanElement, PropsWithChildren<BaseProps>>(
//   (
//     { className, ...props },
//     ref
//   ) => (
//     <span
//       {...props}
//       ref={ref}
//       className={cx(
//         'material-icons',
//         className,
//         css`
//           font-size: 18px;
//           vertical-align: text-bottom;
//         `
//       )}
//     />
//   )
// )

export const Icon = React.forwardRef(
    (
      { className, children, ...props }: PropsWithChildren<BaseProps>,
      ref: Ref<HTMLSpanElement>
    ) => (
      <span
        {...props}
        ref={ref}
        className={cx(
          'material-icons',
          className,
          css`
            font-size: 18px;
            vertical-align: text-bottom;
          `
        )}
      >
        {children}
      </span>
    )
  )

export const Instruction = React.forwardRef<HTMLDivElement, PropsWithChildren<BaseProps>>(
  (
    { className, ...props },
    ref
  ) => (
    <div
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          white-space: pre-wrap;
          margin: 0 -20px 10px;
          padding: 10px 20px;
          font-size: 14px;
          background: #f8f8e8;
        `
      )}
    />
  )
)

export const Menu = React.forwardRef<HTMLDivElement, PropsWithChildren<BaseProps>>(
  (
    { className, ...props },
    ref
  ) => (
    <div
      {...props}
      data-test-id="menu"
      ref={ref}
      className={cx(
        className,
        css`
          & > * {
            display: inline-block;
          }

          & > * + * {
            margin-left: 15px;
          }
        `
      )}
    />
  )
)

export const Portal = ({ children }: { children?: ReactNode }) => {
    const [mounted, setMounted] = React.useState(false);
  
    React.useEffect(() => {
      setMounted(true);
    }, []);
  
    return mounted ? ReactDOM.createPortal(children, document.body) : null;
  };

export const Toolbar = React.forwardRef<HTMLDivElement, PropsWithChildren<BaseProps>>(
  (
    { className, ...props },
    ref
  ) => (
    <Menu
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          position: relative;
          padding: 1px 18px 17px;
          margin: 0 -20px;
          border-bottom: 2px solid #eee;
          margin-bottom: 20px;
        `
      )}
    />
  )
)