import {Dispatch, SetStateAction} from "react";
import 'react-quill/dist/quill.snow.css';
import ReactQuill, { Quill } from 'react-quill';
import BlotFormatter from "quill-blot-formatter";

Quill.register('modules/blotFormatter', BlotFormatter);
const icons = Quill.import('ui/icons');
icons.header[1] = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="Vector" d="M16 10L19 9L19 19M3 5V12M3 12V19M3 12H11M11 5V12M11 12V19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
icons.header[2] = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="Vector" d="M15 12.5V12C15 10.3431 16.3431 9 18 9H18.1716C19.7337 9 20.9996 10.2665 20.9996 11.8286C20.9996 12.5788 20.702 13.2982 20.1716 13.8286L15 19.0002L21 19M3 5V12M3 12V19M3 12H11M11 5V12M11 12V19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
icons.header[3] = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="Vector" d="M15 9H21L17 13H18C19.6569 13 21 14.3431 21 16C21 17.6569 19.6569 19 18 19C17.3793 19 16.7738 18.8077 16.2671 18.4492C15.7604 18.0907 15.3775 17.5838 15.1709 16.9985M3 5V12M3 12V19M3 12H11M11 5V12M11 12V19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
icons.header[4] = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="Vector" d="M18 9L15.5 17H20M20 17H21M20 17V14M20 17V19M3 5V12M3 12V19M3 12H11M11 5V12M11 12V19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
icons.header[5] = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="Vector" d="M21 9H17L15.75 14.0158C15.8285 13.9268 15.912 13.8429 16 13.7642C16.3509 13.4504 16.7731 13.2209 17.2346 13.0991C17.9263 12.9166 18.6611 12.9876 19.3053 13.2987C19.9495 13.6099 20.4608 14.1414 20.7479 14.7967C21.035 15.452 21.0788 16.188 20.8707 16.8725C20.6627 17.557 20.2165 18.1447 19.6133 18.5295C19.0101 18.9142 18.2895 19.0704 17.5811 18.9704C16.8726 18.8705 16.2232 18.521 15.75 17.9844M3 5V12M3 12V19M3 12H11M11 5V12M11 12V19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
icons.header[6] = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="Vector" d="M15.4024 14.5249C14.574 15.9516 15.0656 17.7759 16.5005 18.5997C17.9354 19.4234 19.7701 18.9346 20.5986 17.5078C21.427 16.0811 20.9352 14.2571 19.5003 13.4334C18.0655 12.6097 16.2309 13.0982 15.4024 14.5249ZM15.4024 14.5249L18.9998 8M3 5V12M3 12V19M3 12H11M11 5V12M11 12V19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`


const modules = {
    toolbar: [
        [{'header': '1'}, {'header': '2'}, {'header': '3'}, {'header': '4'}, {'header': '5'}, {'header': '6'}, {'font': []}],
        [{size: []}],
        [{'color':  ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466', '#111827', '#374151', '#1F2937', '#4B5563']}, {'background': []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        [{'align': ''}, {'align': 'center'}, {'align': 'right'}],
        ['link', 'image'],
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
    blotFormatter: {}
}

type PropsType = {
    content: string,
    setContent: Dispatch<SetStateAction<string>>
}
export default function ReactQuillComponent({setContent, content}: PropsType) {

    return (
        <div className="w-full mb-10">
            <ReactQuill
                theme="snow"
                className="w-full"
                value={content}
                modules={modules}
                onChange={value => {
                    setContent(value)
                }}
            />
        </div>
    )
}