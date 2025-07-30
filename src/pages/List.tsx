import ListBlock from "../components/listBlock";

function List() {
  return (
    <div>
      리스트임
      <ListBlock
        title="오늘의 일기"
        summary="hi"
        date={new Date()}
        onClick={() => {}}
      ></ListBlock>
    </div>
  );
}

export default List;
