import { CheckAuthentication } from '@/components/check-authentication';
import Head from 'next/head';
import { ChangeEvent, Dispatch, Fragment, SetStateAction, useState } from 'react';
import dynamic from 'next/dynamic';
import { Listbox, Transition } from '@headlessui/react';
import { Icon } from '@/components/sprite-icons';
import useSWR from 'swr';
import { axiosCfg, fetcher } from '@/core-axios';
const ReactQuillComponent = dynamic(() => import('@/components/admin/react-quill-component'), {ssr: false});

export default function AddHIW() {
  const [title, setTitle] = useState<string>('')
  const [groupId, setGroup] = useState<number | null>(null)
  const [name_category, setTitleCategory] = useState<string>('')
  const [content, setContent] = useState<string>('')

  const clear = () => {
    setTitle('')
    setTitleCategory('')
    setGroup(null)
    setContent('')
  }

  const addHIW = async (): Promise<void> => {
    try {
      await axiosCfg.post('/api/static/hiw', {
        title,
        name_category,
        content,
        groupId
      })
      clear()
      alert("Статья добавлена")
    } catch (e) {
      alert("Ошибка. Вероятнее всего вы не заполнили все поля")
      console.error(e)
    }
  }

  return (
    <>
      <Head>
        <title>Add HIW</title>
      </Head>
      <section className='pt-32'>
        <div className='max-w-container mx-auto px-8 mb-8 lg:px-4'>
          <div className="flex flex-col mb-10">
            <label className="mb-4" htmlFor="title">Название</label>
            <input
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              type="text"
              id="title"
              className="border border-solid border-[#D1D5DB] rounded-md px-4 py-2 max-w-[400px] outline-0"
            />
          </div>
          <div className="flex flex-col mb-10">
            <label className="mb-4" htmlFor="titleCategory">Название Категории</label>
            <input
              value={name_category}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleCategory(e.target.value)}
              type="text"
              id="titleCategory"
              className="border border-solid border-[#D1D5DB] rounded-md px-4 py-2 max-w-[400px] outline-0"
            />
          </div>
          <GroupSelect group={groupId} setGroup={setGroup}/>
          <ReactQuillComponent setContent={setContent} content={content}/>
          <button
            className="bg-dark-purplish-blue rounded-md px-4 py-2 text-white duration-200 ease-out hover:bg-greyish-purplish-blue"
            onClick={addHIW}
          >
            Создать статью
          </button>
        </div>
      </section>
      <CheckAuthentication />
    </>
  );
}

type PropsType = {
  setGroup:Dispatch<SetStateAction<number | null>>
  group: number | null
}

type GroupType = {
  id: number,
  name:string
}
function GroupSelect({group, setGroup}: PropsType) {
  const {data = []} = useSWR<GroupType[]>('/api/static/hiw/group', fetcher)

  return (
    <Listbox as="div" className="w-[240px] relative flex z-1 mb-8" value={group} onChange={(id) => setGroup(id)}>
      <Listbox.Button className="flex items-center justify-between w-full text-base text-white font-normal py-3.5 pr-4 pl-6 bg-marengo rounded-md">
        <span className="text-ellipsis overflow-hidden whitespace-nowrap">Выбрать группу</span>
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
          {data.length > 0 ? (
            <>
              {data.map((item) => (
                <Listbox.Option className="flex items-center justify-between cursor-pointer rounded-lg hover:bg-[#E5E7EB] duration-300 transition-colors m-1 px-3 py-2.5" key={item.id} value={item.id}>
                  <span>{item.name}</span>
                  {group === item.id && (
                    <div className="flex items-center justify-center w-6 h-6">
                      <Icon name="check-mark" className="w-4 h-[11px] text-dark-purplish-blue"/>
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </>
          ) : (
            <h2 className='font-medium text-lg text-sapphire-blue text-center my-4'>Empty</h2>
          )}
        </Listbox.Options>
      </Transition>
    </Listbox>
  )
}