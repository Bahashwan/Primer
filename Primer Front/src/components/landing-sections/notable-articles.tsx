import {ArticleCardType, BlogCard} from "@/components/cards";


const list: ArticleCardType[] = [
    {
        id: 1,
        title: "Fuga quibusdam non recusandae ipsam iure exercitationem. Earum itaque necessitatibus qui ab dignissimos suscipit accusamus possimus magni. Officiis odio harum tempora provident vel.",
        banner: "dev.jpg",
        date: "2023-05-30T17:46:09.785Z",
        description: "dicta quibusdam accusamus aspernatur vero molestiae vel quis explicabo non blanditiis vel veniam nemo animi quas nam libero aliquid architecto cumque totam unde porro quia minima cupiditate amet dicta rerum occaecati debitis enim cum eveniet facilis molestias ullam dicta facilis laborum dolor voluptatum repellendus velit sunt odit totam omnis voluptatibus minus minima consequuntur deleniti et labore enim neque iusto repellendus facere laborum ea placeat ipsam sapiente asperiores optio expedita similique iure eos pariatur omnis aliquid similique consequuntur sunt ad in ex quasi porro nam nesciunt hic laudantium incidunt unde perspiciatis perferendis voluptatum harum magni corporis nihil labore animi esse porro facere in qui natus atque praesentium animi quo qui voluptatum quia fugit eaque suscipit pariatur aliquid assumenda omnis cum quisquam facilis nostrum dicta a nam consectetur nam corrupti voluptatum voluptas occaecati harum dolore modi non explicabo dignissimos incidunt illum iste quaerat voluptate porro quod explicabo vitae temporibus reprehenderit debitis repellat fuga ipsa facere in labore non eligendi laudantium delectus maiores est voluptates reiciendis tempora non natus perspiciatis error velit voluptas id neque vero illo sed dolorum officia neque facilis provident ipsa id laborum omnis odio repudiandae neque corporis suscipit corporis rerum nobis optio vitae commodi voluptate quae nesciunt architecto dicta",
        Category: [
            {
                id: 7,
                name: "gosh",
                isVisible: true
            }
        ]
    },
    {
        id: 2,
        title: "Fuga quibusdam non recusandae ipsam iure exercitationem. Earum itaque necessitatibus qui ab dignissimos suscipit accusamus possimus magni. Officiis odio harum tempora provident vel.",
        banner: "dev.jpg",
        date: "2023-05-30T17:46:09.785Z",
        description: "dicta quibusdam accusamus aspernatur vero molestiae vel quis explicabo non blanditiis vel veniam nemo animi quas nam libero aliquid architecto cumque totam unde porro quia minima cupiditate amet dicta rerum occaecati debitis enim cum eveniet facilis molestias ullam dicta facilis laborum dolor voluptatum repellendus velit sunt odit totam omnis voluptatibus minus minima consequuntur deleniti et labore enim neque iusto repellendus facere laborum ea placeat ipsam sapiente asperiores optio expedita similique iure eos pariatur omnis aliquid similique consequuntur sunt ad in ex quasi porro nam nesciunt hic laudantium incidunt unde perspiciatis perferendis voluptatum harum magni corporis nihil labore animi esse porro facere in qui natus atque praesentium animi quo qui voluptatum quia fugit eaque suscipit pariatur aliquid assumenda omnis cum quisquam facilis nostrum dicta a nam consectetur nam corrupti voluptatum voluptas occaecati harum dolore modi non explicabo dignissimos incidunt illum iste quaerat voluptate porro quod explicabo vitae temporibus reprehenderit debitis repellat fuga ipsa facere in labore non eligendi laudantium delectus maiores est voluptates reiciendis tempora non natus perspiciatis error velit voluptas id neque vero illo sed dolorum officia neque facilis provident ipsa id laborum omnis odio repudiandae neque corporis suscipit corporis rerum nobis optio vitae commodi voluptate quae nesciunt architecto dicta",
        Category: [
            {
                id: 7,
                name: "gosh",
                isVisible: true
            }
        ]
    },
    {
        id: 3,
        title: "Fuga quibusdam non recusandae ipsam iure exercitationem. Earum itaque necessitatibus qui ab dignissimos suscipit accusamus possimus magni. Officiis odio harum tempora provident vel.",
        banner: "dev.jpg",
        date: "2023-05-30T17:46:09.785Z",
        description: "dicta quibusdam accusamus aspernatur vero molestiae vel quis explicabo non blanditiis vel veniam nemo animi quas nam libero aliquid architecto cumque totam unde porro quia minima cupiditate amet dicta rerum occaecati debitis enim cum eveniet facilis molestias ullam dicta facilis laborum dolor voluptatum repellendus velit sunt odit totam omnis voluptatibus minus minima consequuntur deleniti et labore enim neque iusto repellendus facere laborum ea placeat ipsam sapiente asperiores optio expedita similique iure eos pariatur omnis aliquid similique consequuntur sunt ad in ex quasi porro nam nesciunt hic laudantium incidunt unde perspiciatis perferendis voluptatum harum magni corporis nihil labore animi esse porro facere in qui natus atque praesentium animi quo qui voluptatum quia fugit eaque suscipit pariatur aliquid assumenda omnis cum quisquam facilis nostrum dicta a nam consectetur nam corrupti voluptatum voluptas occaecati harum dolore modi non explicabo dignissimos incidunt illum iste quaerat voluptate porro quod explicabo vitae temporibus reprehenderit debitis repellat fuga ipsa facere in labore non eligendi laudantium delectus maiores est voluptates reiciendis tempora non natus perspiciatis error velit voluptas id neque vero illo sed dolorum officia neque facilis provident ipsa id laborum omnis odio repudiandae neque corporis suscipit corporis rerum nobis optio vitae commodi voluptate quae nesciunt architecto dicta",
        Category: [
            {
                id: 7,
                name: "gosh",
                isVisible: true
            }
        ]
    }
]

export function NotableArticles() {
    return (
        <section className="notable-articles py-32">
            <div className="max-w-container mx-auto px-8 lg:px-4 md:px-0">
                <div className="flex items-center justify-between mb-[104px] md:px-4 sm:flex-col sm:items-start">
                    <h2 className="text-5xl text-dark-purplish-blue uppercase font-bold xl:text-4xl md:mr-4 sm:text-[32px] sm:mb-6 m:text-2xl">
                        Notable articles
                    </h2>
                    <button
                        className="w-[240px] text-lg bg-white text-dark-purplish-blue font-semibold rounded-3xl py-3.5 px-4 shadow-btn duration-200 ease-out improve-performance origin-center hover:btn-scale-95 m:text-base">
                        Read more
                    </button>
                </div>
                <div className="grid grid-cols-3 gap-10 xl:grid-cols-2 md:flex md:flex-nowrap md:overflow-x-auto md:gap-6 md:pb-4 md:pl-4">
                    {list.map(item => (
                        <BlogCard key={item.id} name='card-nft' {...item} />
                    ))}
                </div>
            </div>
        </section>
    )
}