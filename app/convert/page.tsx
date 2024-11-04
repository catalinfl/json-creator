"use client"
import React, { KeyboardEventHandler, useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { FieldValues, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

type ConvertGoForm = {
    message: string
}

const ConvertGo = () => {

    

    const form = useForm();
    const [data, setData] = useState('')
    const postData = async (data: FieldValues) => {
        const response = await fetch('/api/convert/go', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                language: 'go',
                message: data.message
            })
        })

        const json = await response.json();
        setData(json)

        return
    }

    const indentationPresent = new Map<number, boolean>();

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const textarea = event.target as HTMLTextAreaElement;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;
    
        if (event.key === 'Tab') {
            event.preventDefault();
            if (start !== end) {
                // indent multiple lines for selection
                const lines = value.substring(start, end).split('\n');
                const newLines = lines.map(line => '\t' + line).join('\n');
                textarea.value = value.substring(0, start) + newLines + value.substring(end);
                textarea.selectionStart = start;
                textarea.selectionEnd = end + lines.length;
            } else {
                // indent single line
                textarea.value = value.substring(0, start) + '\t' + value.substring(end);
                textarea.selectionStart = textarea.selectionEnd = start + 1;
            }
        } else if (event.key === 'Enter') { // indent new line
            event.preventDefault();
            const lineStart = value.lastIndexOf('\n', start - 1) + 1;
            const line = value.substring(lineStart, start);
            const indentMatch = line.match(/^\s*/);
            const indent = indentMatch ? indentMatch[0] : '';
            textarea.value = value.substring(0, start) + '\n' + indent + value.substring(end);
            textarea.selectionStart = textarea.selectionEnd = start + indent.length + 1;
        } else if (event.key === 'Backspace') {
            if (start === end && start > 0 && value[start - 1] === '\t') { // deletes last tab
                event.preventDefault();
                textarea.value = value.substring(0, start - 1) + value.substring(end);
                textarea.selectionStart = textarea.selectionEnd = start - 1;
            }
        }
    };

    console.log(data.t as any)
    

  return (
    <Form {...form}>
    <form className="max-w-4xl flex flex-col mx-auto justify-center items-center" onSubmit={form.handleSubmit((data, event) => {
        event?.preventDefault()
        postData(data)
        })}>
    <FormField
    control={form.control}
    name="message"
    render={( { field } ) => (
        <FormItem className="w-full mt-12">
            <FormLabel> Convert Go to structs </FormLabel>
            <FormControl>
                <Textarea 
                onKeyDown={handleKeyDown}
                {...field} 
                className='h-[400px] resize-none' placeholder="Type" />
            </FormControl>
        </FormItem>
    )}
    />
        <Button type="submit" className="mt-12"> Test </Button>
        </form>
        <div className=''>
            {}
        </div>
    </Form>
  )
}

export default ConvertGo