import './App.css';
import {Route, Routes} from 'react-router';
import Button from "./atoms/Button";
import Input from "./atoms/Input";
import Label from "./atoms/Label";
import Image from "./atoms/Image";
import pandaIcon from "./assets/panda_icon.svg";
import Select from "./atoms/Select";

const App = () => {
    return (
        <>
            <Button onClick={() => console.log('click2')} style={{background: '#123456'}}>1</Button>
            <Input type={'text'} placeholder={'검색할 상품을 입력해주세요'} style={{background: 'blue'}} onChange={() => {}}></Input>
            <Label style={{background: 'red'}} htmlFor={'test'}>자유게시판</Label>
            <Image src={pandaIcon} alt={'판다'} style={{borderRadius: '24px'}}></Image>
            <Select id={'test'} style={{background: 'green'}} onChange={(data) => console.log(data)}></Select>
        </>
    );
}

export default App;
