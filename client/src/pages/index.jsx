import Card from "../components/card/Card"
import GridContainer from "../components/gridContainer/GridContainer"
import Layout from "../components/layout/Layout"

export default function Index() {
  const data = [
    {
      id: 1,
      title: "The Shawshank Redemption",
      author: "Stephen King",
      creatingDate: "1994-10-14",
      publishedDate: "1994-10-14",
      image: "",
      contentBlocks: [
        "1Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nunc aliquet nunc, quis aliqua",
        "2lore ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl",
        "3lore ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl",
        "4lore ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl",
      ],
    },
    {
      id: 1,
      title: "The Shawshank Redemption",
      author: "Stephen King",
      creatingDate: "1994-10-14",
      publishedDate: "1994-10-14",
      image: "",
      contentBlocks: [
        "1Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nunc aliquet nunc, quis aliqua",
        "2lore ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl",
        "3lore ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl",
        "4lore ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl",
      ],
    },
    {
      id: 1,
      title: "The Shawshank Redemption",
      author: "Stephen King",
      creatingDate: "1994-10-14",
      publishedDate: "1994-10-14",
      image: "",
      contentBlocks: [
        "1Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nunc aliquet nunc, quis aliqua",
        "2lore ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl",
        "3lore ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl",
        "4lore ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl",
      ],
    },
    {
      id: 1,
      title: "The Shawshank Redemption",
      author: "Stephen King",
      creatingDate: "1994-10-14",
      publishedDate: "1994-10-14",
      image: "",
      contentBlocks: [
        "1Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nunc aliquet nunc, quis aliqua",
        "2lore ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl",
        "3lore ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl",
        "4lore ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl",
      ],
    },
    {
      id: 1,
      title: "The Shawshank Redemption",
      author: "Stephen King",
      creatingDate: "1994-10-14",
      publishedDate: "1994-10-14",
      image: "",
      contentBlocks: [
        "1Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae aliquam ultricies, nunc nunc aliquet nunc, quis aliqua",
        "2lore ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl",
        "3lore ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl",
        "4lore ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl",
      ],
    },
  ]
  return (
    <Layout>
      <GridContainer cols={data.length} maxCols={3}>
        {data.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            author={item.author}
            publishedDate={item.publishedDate}
            content={item.contentBlocks[0]}
          />
        ))}
      </GridContainer>
    </Layout>
  )
}
