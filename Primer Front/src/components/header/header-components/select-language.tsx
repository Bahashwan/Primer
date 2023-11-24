import {Fragment, useState} from "react";
import {Listbox, Transition} from "@headlessui/react";
import {Icon} from "@/components/sprite-icons";

const languages = [
    { id: 1, name: 'English' },
    { id: 2, name: 'Русский' },
    { id: 3, name: 'German' },
    { id: 4, name: '日本語' },
]

export function SelectLanguage() {
    const [currentLanguage, setLanguage] = useState(languages[0])

    return (
        <Listbox as="div" className="relative flex items-center ml-5 md:hidden" value={currentLanguage} onChange={setLanguage}>
            <Listbox.Button>
                <div className="flex items-center space-x-2 cursor-pointer">
                    <Icon name="language" className="fill-dark-purplish-blue w-[26px] h-[26px]"/>
                    <Icon name="arrow" className="fill-dark-purplish-blue w-3 h-3"/>
                </div>
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
                <Listbox.Options className="w-[160px] flex flex-col py-2 rounded-xl absolute top-[60px] right-0 bg-white shadow-btn">
                    {languages.map((language) => (
                        <Listbox.Option className="cursor-pointer rounded-lg hover:bg-[#E5E7EB] duration-300 transition-colors m-1 px-3 py-2.5" key={language.id} value={language}>
                            {language.name}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Transition>
        </Listbox>
    )
}