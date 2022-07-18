import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { CodeBlock } from "~/comps/code-block"
import { getMMLData } from "~/utils/mml"

export default function MML() {
  const router = useRouter()
  const [data, setData] = useState<any>({ })

  const load = () => {
    if(Object.entries(data).length > 0)
      return;

    const { id }: any = router.query

    if(id) {
      getMMLData(id)
        .then((res) => {
          setData(res)
        })
    }    
  }

  useEffect(() => {
    load()
  }, [router.query])

  return (
    <div>
      <CodeBlock text={data.mml_content || ''}/>
    </div>
  )
}
