import { Disclosure } from '@headlessui/react'
import {clsx} from "clsx";
import {useRef} from "react";
import Image from "next/image";
import {Icon} from "@/components/sprite-icons";

type TypeArrayAccordions = {
    id: string,
    title: string,
    description: string
}

const ListOfAccordions: TypeArrayAccordions[] = [
    {
        id: "1",
        title: "What is an NFT?",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
    },
    {
        id: "2",
        title: "How much does it cost to create an NFT?",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
    },
    {
        id: "3",
        title: "What are Proof of Work blockchains?",
        description: `
            <div>
                <p>
                    We’re almost done with the technical terms, just bear with us for a moment here! These two “consensus mechanisms” are different ways blockchains validate transactions. There are big technical differences, but we promised to spare you the technical talk—so let’s talk about what matters to you.
                </p>
                <p>The main practical differences are:</p>
                <ul class="list-disc pl-10 sm:pl-5">
                    <li>
                        Proof of Work is extremely secure and decentralized, but consumes high amounts of energy and makes blockchains relatively slow because it relies on miners and their hardware to verify each block. In the case of Ethereum, it can also lead to high fees for buying, selling or minting NFTs.
                    </li>
                    <li>
                        Proof of Stake blockchains usually have lower fees and higher performance since blocks are published by stakers—the PoS equivalent of miners—who lock up their funds in a smart contract. Because these blockchains are more efficient and no noisy expensive hardware is involved in the process, they also consume way less energy and have a smaller carbon footprint.
                    </li>
                </ul>
                <p>As far as how you interact with digital assets, nothing changes between Proof of Work and Proof of Stake blockchains.</p>
            </div>
        `
    },
    {
        id: "4",
        title: "How much does it cost to create an NFT?",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
    },
    {
        id: "5",
        title: "How much does it cost to create an NFT?",
        description: "ssss"
    }
]


export function GotQuestions() {
    const listRefs = useRef<HTMLButtonElement[]>([])

    const handleClick = (id: string): void => {
        const otherRefs = listRefs.current.filter((ref) => {
            return ref.getAttribute("data-id") !== id;
        });
        otherRefs.forEach((ref) => {
            const isOpen = ref.getAttribute("data-open") === "true";

            if (isOpen) {
                ref.click();
            }
        })
    }


    return (
        <section className="got-questions py-32 bg-snow-white">
            <div className="max-w-container mx-auto px-8 lg:px-4">
                <div className="flex items-center justify-between mb-[104px] sm:flex-col sm:items-start">
                    <h2 className="text-5xl text-dark-purplish-blue uppercase font-bold xl:text-4xl sm:text-[32px] sm:mb-6 m:text-2xl">
                        Got questions?
                    </h2>
                    <button
                        className="w-[240px] text-lg bg-white text-dark-purplish-blue font-semibold rounded-3xl py-3.5 px-4 shadow-btn duration-200 ease-out improve-performance origin-center hover:btn-scale-95 m:text-base">
                        More answers
                    </button>
                </div>
                <div className="flex items-start">
                    <div className="w-[800px] shrink-0 xl:w-full xl:shrink">
                        {ListOfAccordions.map((accordion) => (
                            <Disclosure key={accordion.id} as="div" className="border-t border-[#9CA3AF] border-solid last:border-b mr-5">
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button
                                            ref={(ref) => {
                                                if (ref) listRefs.current = [...listRefs.current, ref]
                                            }}
                                            data-id={accordion.id}
                                            data-open={open}
                                            onClick={() => handleClick(accordion.id)}
                                            className="flex items-center justify-between w-full py-[29px] uppercase font-normal text-[#1F2937] text-2xl text-left md:text-xl sm:text-lg"
                                        >
                                            <span className="mr-4">{accordion.title}</span>
                                            <Icon name="arrow-up-right" className={clsx("shrink-0 text-dark-purplish-blue w-[22px] h-[22px]",{"rotate-90": open})}/>
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="text-lg text-greyish-purplish-blue pb-6 pr-14 md:text-base sm:text-sm">
                                            <div dangerouslySetInnerHTML={{__html: accordion.description}}/>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        ))}
                    </div>
                    <div className="relative overflow-hidden grow xl:hidden">
                        <picture>
                            <source srcSet="/images/1x1.png" media="(max-width:1279px)" type="image/png"/>
                            <Image
                                src="/images/questions.png"
                                alt="questions-image"
                                width={580}
                                height={885}
                                className="w-full h-auto"
                            />
                        </picture>
                    </div>
                </div>
            </div>
        </section>
    )
}