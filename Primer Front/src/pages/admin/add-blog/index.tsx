import {CheckAuthentication} from "@/components/check-authentication";
import dynamic from 'next/dynamic';
import Head from "next/head";
import {ChangeEvent, Dispatch, Fragment, SetStateAction, useRef, useState} from "react";
import {axiosCfg} from "@/core-axios";
import {Listbox, Transition} from "@headlessui/react";
import {Icon} from "@/components/sprite-icons";
import {CategoriesGet} from "@/hooks-swr/categories-get";
const ReactQuillComponent = dynamic(() => import('@/components/admin/react-quill-component'), {ssr: false});

export default function AddBlogPage() {
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [file, setFile] = useState<File | null>(null)
    const [category, setCategory] = useState<number[]>([])
    const inputFile = useRef<HTMLInputElement>(null)

    const handleChangeFile = (e: ChangeEvent<HTMLInputElement>): void => {
        const selectedFile = e.target.files ? e.target.files[0] : null;
        setFile(selectedFile)
    }

    const clear = (): void => {
        setTitle('')
        setDescription('')
        setContent('')
        setCategory([])
        setFile(null)
        if (inputFile.current) inputFile.current.value = ""
    }

    const addBlog = async (): Promise<void> => {
        try {
            const formData = new FormData();
            formData.append('title', title)
            formData.append('description', description)
            formData.append('content', content)
            formData.append('category', `[${category.join(', ')}]`)
            if (file) formData.append('photo', file)
            await axiosCfg.post('/api/blog', formData)
            clear()
            alert("Блог добавлен")
        } catch (e) {
            alert("Ошибка. Вероятнее всего вы не заполнили все поля")
            console.error(e)
        }
    }

    return (
        <>
            <Head>
                <title>Add Blog</title>
            </Head>
            <section className="pt-32">
                <div className="max-w-container mx-auto px-8 mb-8 lg:px-4">
                    <div className="flex flex-col mb-10">
                        <label className="mb-4" htmlFor="title">Название блога</label>
                        <input
                            value={title}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                            type="text"
                            id="title"
                            className="border border-solid border-[#D1D5DB] rounded-md px-4 py-2 max-w-[400px] outline-0"
                        />
                    </div>
                    <div className="flex flex-col mb-10">
                        <label className="mb-4" htmlFor="description">Описание блога</label>
                        <textarea
                            value={description}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                            id="description"
                            className="border border-solid border-[#D1D5DB] rounded-md px-4 py-2 max-w-[400px] outline-0 min-h-[140px] max-h-[250px]"
                        />
                    </div>
                    <div className="flex flex-col items-start mb-10">
                        <label className="mb-4" htmlFor="description">Загрузить изображение</label>
                        <input ref={inputFile} accept=".jpg, .png, .jpeg" type="file" onChange={handleChangeFile}/>
                    </div>
                    <CategoriesSelect category={category} setCategory={setCategory}/>
                    <ReactQuillComponent setContent={setContent} content={content}/>
                    <button
                        className="bg-dark-purplish-blue rounded-md px-4 py-2 text-white duration-200 ease-out hover:bg-greyish-purplish-blue"
                        onClick={addBlog}
                    >
                        Создать блог
                    </button>
                </div>
            </section>
            <CheckAuthentication/>
        </>
    )
}


type PropsType = {
    setCategory:Dispatch<SetStateAction<number[]>>
    category: number[]
}
function CategoriesSelect({category, setCategory}: PropsType) {
    const {categories} = CategoriesGet()

    return (
        <Listbox multiple as="div" className="w-[240px] relative flex z-1 mb-8" value={category} onChange={(id) => setCategory(id)}>
            <Listbox.Button className="flex items-center justify-between w-full text-base text-white font-normal py-3.5 pr-4 pl-6 bg-marengo rounded-md">
                <span className="text-ellipsis overflow-hidden whitespace-nowrap">Выбрать категории</span>
                <Icon name="arrow-rounded" className="text-white w-3 h-3 ml-2.5 shrink-0"/>
            </Listbox.Button>
            <Transition
                as={Fragment}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100 will-change-transform"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Listbox.Options className="flex flex-col py-2 rounded-xl absolute top-[60px] right-0 left-0 bg-white shadow-btn max-h-[224px] overflow-y-auto">
                    {categories.map((sortItem) => (
                        <Listbox.Option className="flex items-center justify-between cursor-pointer rounded-lg hover:bg-[#E5E7EB] duration-300 transition-colors m-1 px-3 py-2.5" key={sortItem.id} value={sortItem.id}>
                            <span>{sortItem.name}</span>
                            {category.includes(sortItem.id) && (
                                <div className="flex items-center justify-center w-6 h-6">
                                    <Icon name="check-mark" className="w-4 h-[11px] text-dark-purplish-blue"/>
                                </div>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Transition>
        </Listbox>
    )
}