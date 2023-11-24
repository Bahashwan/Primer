import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { CheckAuthentication } from '@/components/check-authentication';
import { Icon } from '@/components/sprite-icons';
import { useState } from 'react';
import { clsx } from 'clsx';
import useSWR from 'swr';
import { fetcher } from '@/core-axios';
import 'react-quill/dist/quill.snow.css';
import Head from 'next/head';

type CategoryType = {
  id: number,
  name_category: string
}

type MenuType = {
  id: number,
  name: string,
  Article: CategoryType[]
}

type PropsType = {
  menu: MenuType[] | string
}

type ContentType = {
  id: number,
  title: string,
  date: string,
  content: string,
  Group: {
    id: number,
    name: string
  }
}


export const getServerSideProps: GetServerSideProps<PropsType> = async () => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/static/hiw/menu`);
    const data = await res.json();
    if (!data) {
      return {
        props: {
          menu: 'Empty',
        },
      };
    }

    return {
      props: {
        menu: data,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        menu: 'Error',
      },
    };
  }
};
export default function DocumentationPage({ menu }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [activeGroup, setActiveGroup] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const {
    data,
    isLoading,
    error,
  } = useSWR<ContentType>(activeCategory ? `/api/static/hiw/${activeCategory}` : null, fetcher);

  return (
    <>
      <Head>
        <title>How it works</title>
      </Head>
      <section className='w-full pt-36 mb-10'>
        <div className='max-w-container mx-auto px-8 lg:px-4'>
          <h1 className='text-sapphire-blue text-7xl font-bold uppercase mb-10 lg:text-5xl m:px-4 m:text-4xl lg:text-center'>how it
            works</h1>
          <div className='grid grid-cols-[360px_1fr] gap-10 lg:flex lg:flex-col'>
            <div className='rounded-3xl border border-solid border-[#D1D5DB] p-6 shadow-btn'>
              <h2 className='font-bold uppercase mb-4 text-lg text-sapphire-blue'>Содержание</h2>
              {typeof menu === 'string' ? (
                <h3 className='text-base text-sapphire-blue font-medium text-center'>{menu}</h3>
              ) : (
                <nav>
                  <ul className='flex flex-col'>
                    {menu.map(menuItem => (
                      <li
                        key={menuItem.id}
                        onClick={() => {
                          if (activeGroup === menuItem.id) setActiveGroup(null);
                          else setActiveGroup(menuItem.id);
                        }}
                      >
                        <div className={clsx('p-4 flex items-center justify-between cursor-pointer', {
                          'border-b border-solid border-[#D1D5DB]': menuItem.id !== activeGroup,
                        })}>
                          <h3 title={menuItem.name}
                              className='text-base text-sapphire-blue font-medium line-clamp-2'>{menuItem.name}</h3>
                          <Icon
                            name='arrow-rounded'
                            className={clsx('shrink-0 w-3 h-2', {
                              '-rotate-90': menuItem.id !== activeGroup,
                              'rotate-0': menuItem.id === activeGroup,
                            })}
                          />
                        </div>
                        <ul className={clsx('flex-col', {
                          'hidden': menuItem.id !== activeGroup,
                          'flex': menuItem.id === activeGroup,
                        })}>
                          {menuItem.Article.map(category => (
                            <li
                              key={category.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveCategory(category.id);
                              }}
                              className={clsx('py-3 pl-8 pr-4 rounded-lg cursor-pointer', {
                                'bg-[#D1D5DB]': category.id === activeCategory,
                              })}
                            >
                              <h4
                                className={clsx('text-sm text-marengo font-medium', {
                                  'duration-150 ease-linear hover:text-[#1883f5]': category.id !== activeCategory,
                                })}
                              >
                                {category.name_category}
                              </h4>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
            <div className='hiw-container'>
              {(!activeCategory || error || isLoading) && (
                <h2 className='font-bold mb-4 text-lg text-sapphire-blue text-center'>
                  {isLoading ? (
                    <div className='flex items-center justify-center'>
                      <span className="mr-2">Please wait</span>
                      <div className="dots flex space-x-1 mt-1.5">
                        <div className="dot-1 w-1 h-1 bg-sapphire-blue rounded-full"/>
                        <div className="dot-2 w-1 h-1 bg-sapphire-blue rounded-full"/>
                        <div className="dot-3 w-1 h-1 bg-sapphire-blue rounded-full"/>
                      </div>
                    </div>
                  ) : (error ? 'Oops, something went wrong' : 'Select a category')}
                </h2>
              )}
              {(data && !isLoading && !error) && (
                <div className='ql-container ql-snow' style={{ position: 'relative', width: '100%', border: 'none' }}>
                  <h2 className='font-bold text-2xl text-sapphire-blue mb-6 uppercase'>{data.title}</h2>
                  <div className='ql-editor' data-gramm='false' style={{ padding: 0 }}
                       dangerouslySetInnerHTML={{ __html: data.content }} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <CheckAuthentication />
    </>
  );
}