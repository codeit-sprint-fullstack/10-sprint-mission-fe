import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import ProductCreateTemplate from '../templates/ProductCreateTemplate';
import useCreateProduct from '../utils/useCreateProduct';

const ProductCreate = () => {
  const navigate = useNavigate();
  const { create, loading } = useCreateProduct();
  const [values, setValues] = useState({
    title: '',
    price: '',
    images: '',
    tags: ''
  });

  const onChange = (e) => {
    const { id, value } = e.target;
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!values.title || !values.price) return;
    const payload = {
      name: values.title,
      price: Number(values.price),
      images: values.images ? values.images.split(',').map((s) => s.trim()) : [],
      tags: values.tags ? values.tags.split(',').map((s) => s.trim()) : [],
    };
    const ok = await create(payload);
    if (ok) navigate('/market');
  };

  const onCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <ProductCreateTemplate
      values={values}
      onChange={onChange}
      onSubmit={onSubmit}
      onCancel={onCancel}
      loading={loading}
    />
  );
};

export default ProductCreate;


