import React from 'react';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import Label from '../atoms/Label';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import styles from './ProductCreateTemplate.module.css';

const ProductCreateTemplate = ({
  values,
  onChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <div className={styles.container}>
      <Header/>
      <main className={styles.main}>
        <h1 className={styles.title}>상품 등록</h1>
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.row}>
            <Label htmlFor="title" style={styles.label}>상품 제목</Label>
            <Input id="title" type="text" placeholder="제목을 입력하세요" style={styles.input} onChange={onChange} value={values.title}/>
          </div>
          <div className={styles.row}>
            <Label htmlFor="price" style={styles.label}>가격</Label>
            <Input id="price" type="number" placeholder="가격을 입력하세요" style={styles.input} onChange={onChange} value={values.price}/>
          </div>
          <div className={styles.row}>
            <Label htmlFor="images" style={styles.label}>이미지 URL(쉼표로 구분)</Label>
            <Input id="images" type="text" placeholder="https://..., https://..." style={styles.input} onChange={onChange} value={values.images}/>
          </div>
          <div className={styles.row}>
            <Label htmlFor="tags" style={styles.label}>태그(쉼표로 구분)</Label>
            <Input id="tags" type="text" placeholder="예: 전자기기, 중고" style={styles.input} onChange={onChange} value={values.tags}/>
          </div>
          <div className={styles.actions}>
            <Button style={styles.submit} onClick={null}>등록하기</Button>
            <Button style={styles.cancel} onClick={onCancel}>취소</Button>
          </div>
        </form>
      </main>
      <Footer/>
    </div>
  );
};

export default ProductCreateTemplate;


