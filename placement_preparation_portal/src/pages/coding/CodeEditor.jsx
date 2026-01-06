import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import '../../App.css'

export default function CodeEditor() {
  const [searchParams] = useSearchParams()
  const mode = searchParams.get('mode') || 'practice'
  const [code, setCode] = useState('// Write your code here\nfunction solve(nums) {\n  \n}')
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)

  const runCode = () => {
    setIsRunning(true)
    setTimeout(() => {
      setOutput('✓ Test passed!\nTime: 12ms\nMemory: 24.5MB')
      setIsRunning(false)
    }, 1000)
  }

  const submitCode = () => {
    setIsRunning(true)
    setTimeout(() => {
      setOutput('✓ All test cases passed!\nAccepted!\nTime: 12ms (Beats 95%)\nMemory: 24.5MB (Beats 87%)')
      setIsRunning(false)
    }, 1500)
  }

  return (
    <div className="section-container">
      <div className="code-editor-header">
        <h2>Two Sum - {mode === 'test' ? 'Submit' : 'Practice'}</h2>
        <div className="problem-desc">
          <p><strong>Problem:</strong> Given an array of integers and a target, find two numbers that add up to the target.</p>
          <p><strong>Example:</strong> nums = [2,7,11,15], target = 9 → [0,1]</p>
        </div>
      </div>

      <div className="code-editor-container">
        <div className="editor-section">
          <h3>Code Editor</h3>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="code-input"
            placeholder="Write your code here..."
          />
          <div className="editor-buttons">
            <button className="btn btn-secondary" onClick={runCode} disabled={isRunning}>
              {isRunning ? '⏳ Running...' : '▶ Run Code'}
            </button>
            {mode === 'test' && (
              <button className="btn btn-primary" onClick={submitCode} disabled={isRunning}>
                {isRunning ? '⏳ Submitting...' : '📤 Submit'}
              </button>
            )}
          </div>
        </div>

        <div className="output-section">
          <h3>Output</h3>
          <pre className="code-output">{output || 'Output will appear here...'}</pre>
        </div>
      </div>
    </div>
  )
}
