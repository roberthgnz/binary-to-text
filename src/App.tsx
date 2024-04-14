import { useState } from "react"

import { Toaster, toast } from 'sonner'

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

function App() {
  const [result, setResult] = useState<string>("")

  const binaryToText = (binaryString: string) => {
    // Split the binary string into an array of 8-bit characters
    const binaryCharacters = binaryString.match(/.{1,8}/g) || [];

    // Convert each binary character to a decimal, then to the corresponding ASCII character
    const text = binaryCharacters
      .map(binary => parseInt(binary, 2))  // Convert binary to decimal
      .map(charCode => String.fromCharCode(charCode))  // Convert decimal to ASCII character
      .join('');  // Join all characters into a single string

    return text;
  }

  const handleBinaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const binary = (e.target.value)
    setResult(binaryToText(binary.replace(/\s+/g, '')))
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result)
    toast.success('Copied to clipboard!')
  }

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <CardTitle>Binary to Text</CardTitle>
            <CardDescription>Enter binary digits to convert to text.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex w-full items-start space-x-4">
              <form className="w-full">
                <Textarea placeholder="Enter binary..." rows={6} onChange={(e) => handleBinaryChange(e)} />
              </form>
            </div>
            <div className="flex w-full items-start">
              <form className="w-full">
                <Textarea placeholder="Text appears here..." rows={6} value={result} readOnly />
              </form>
            </div>
            <div className="flex w-full items-start">
              <Button className="w-full" onClick={copyToClipboard} disabled={result.length === 0}>Copy</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Toaster richColors />
    </>
  )
}

export default App
