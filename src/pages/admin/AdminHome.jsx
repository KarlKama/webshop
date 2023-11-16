import React from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const AdminHome = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Button as={ Link } to="/admin/add" variant="primary">{t('admin.add-product')}</Button>{' '}
      <Button as={ Link } to="/admin/categories" variant="secondary">{t('admin.categories')}</Button>{' '}
      <Button as={ Link } to="/admin/products" variant="success">{t('admin.products')}</Button>{' '}
      <Button as={ Link } to="/admin/shops" variant="warning">{t('admin.shops')}</Button>{' '}
    </div>
  )
}

export default AdminHome