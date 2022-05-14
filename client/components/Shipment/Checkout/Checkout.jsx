import React, { useCallback, useEffect } from 'react';

import './Checkout.scss';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Link, Redirect } from 'react-router-dom';
import {
  withAddressValidationSchema,
  withShopValidationSchema,
} from '../../../../validationShemas';
import getFormatAddress from '../../../../utils/getFormatAddress';
import getEventArgs from '../../../../utils/getEventArgs';
import QRReader from '../../../containers/Shipment/QRReader';

function Checkout(props) {
  const {
    cities,
    streets,
    shops,
    selectedCityId,
    isPickup,
    isAuthenticated,
    isConfirmable,
    orderError,
    discountError,
    isQrModalShowing,
    onMount,
    onCitySelected,
    onChange,
    onSubmit,
    onDiscountApply,
    onOpenModal,
  } = props;

  useEffect(() => {
    onMount();
  }, []);

  useEffect(() => {
    const firstId = selectedCityId ?? cities[0]?._id;
    if (firstId) {
      onCitySelected(firstId);
    }
  }, [cities, selectedCityId]);

  const initialValues = {
    isPaid: 'false',
    isPickup,
    shopId: shops[0]?._id,
    cityId: cities[0]?._id,
    streetId: streets[0]?._id,
    house: null,
    building: null,
    apartment: null,
  };

  const initialDiscountValues = {
    title: '',
  };

  const changeCallback = useCallback(
    (e) => {
      const { target, args } = getEventArgs(e, ['INPUT', 'SELECT']);
      let { value } = target;
      switch (target.type) {
        case 'number':
          value = parseInt(value, 10);
          break;
        case 'checkbox':
          value = target.checked;
          break;
        default:
          break;
      }
      switch (args[1]) {
        case 'CHANGE':
          onChange(args[0], value);
          break;
        default:
          break;
      }
    },
    [onChange]
  );

  const submitCallback = useCallback(
    (values, { setSubmitting }) => {
      setSubmitting(false);
      onSubmit({ ...values, isPaid: values.isPaid === 'true' });
    },
    [onSubmit]
  );

  const submitDiscountCallback = useCallback(
    (values, { setSubmitting }) => {
      setSubmitting(false);
      onDiscountApply(values);
    },
    [onDiscountApply]
  );

  if (!isAuthenticated) {
    return <Redirect to="/register" />;
  }

  if (!isConfirmable) {
    return <Redirect to="/" />;
  }

  /* if (isCardAdding) {
    return <Redirect to="/checkout/card" />;
  } */

  const validationsSchema = isPickup ? withShopValidationSchema : withAddressValidationSchema;

  return (
    <main className="auth" onChange={changeCallback}>
      <h1>Confirm order</h1>

      <div className="decoration decoration_light" />
      <Formik initialValues={initialDiscountValues} onSubmit={submitDiscountCallback}>
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting, dirty, isValid }) => (
          <form className="auth__form" onSubmit={handleSubmit}>
            <div className="row">
              <label htmlFor="title-id" className="row">
                Промокод
                <input
                  className="form__input"
                  id="title-id"
                  name="title"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.house}
                />
              </label>
              <button
                className="auth-button auth-button_login auth-button_shifted"
                type="submit"
                disabled={isSubmitting || !dirty || !isValid}
              >
                Применить
              </button>
              <button
                className="auth-button auth-button_login auth-button_shifted"
                type="button"
                onClick={onOpenModal}
              >
                <img src="/qr-white.png" alt="qr-white.png" />
              </button>
            </div>
            <p className="form__error"> {discountError}</p>
          </form>
        )}
      </Formik>

      <Formik
        initialValues={initialValues}
        validationSchema={validationsSchema}
        onSubmit={submitCallback}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          dirty,
          isValid,
        }) => (
          <form className="auth__form" onSubmit={handleSubmit}>
            <label htmlFor="isPaid-id" className="row">
              Способ оплаты
              <select
                className={`form__input${
                  errors.isPaid && touched.isPaid ? ' form__input_wrong' : ''
                }`}
                id="isPaid-id"
                name="isPaid"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.isPaid}
              >
                <option value="false">Наличными при получении</option>
                <option value="true">Оплата онлайн</option>
              </select>
            </label>
            <label htmlFor="isPickup_CHANGE" className="row">
              Самовывоз
              <input
                className={`form__input form__input_shadowless${
                  errors.isPickup && touched.isPickup ? ' form__input_wrong' : ''
                }`}
                id="isPickup_CHANGE"
                name="isPickup"
                type="checkbox"
                checked={isPickup}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.isPickup}
              />
            </label>
            {isPickup
              ? [
                  <label htmlFor="shop-id" className="row">
                    Адрес заведения
                    <select
                      className={`form__input${
                        errors.shopId && touched.shopId ? ' form__input_wrong' : ''
                      }`}
                      id="shop-id"
                      name="shopId"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.shopId}
                    >
                      {shops.map((elem) => (
                        <option value={elem._id} selected={elem._id === values.shopId}>
                          {getFormatAddress(elem.address)}
                        </option>
                      ))}
                    </select>
                  </label>,
                ]
              : [
                  <label htmlFor="selectedCityId_CHANGE" className="row">
                    Город
                    <select
                      className={`form__input${
                        errors.cityId && touched.cityId ? ' form__input_wrong' : ''
                      }`}
                      id="selectedCityId_CHANGE"
                      name="cityId"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.cityId}
                    >
                      {cities.map((elem) => (
                        <option value={elem._id} selected={elem._id === values.cityId}>
                          {elem.title}
                        </option>
                      ))}
                    </select>
                  </label>,
                  <label htmlFor="street-id" className="row">
                    Улица
                    <select
                      className={`form__input${
                        errors.streetId && touched.streetId ? ' form__input_wrong' : ''
                      }`}
                      id="street-id"
                      name="streetId"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.streetId}
                    >
                      {streets.map((elem) => (
                        <option value={elem._id} selected={elem._id === values.streetId}>
                          {elem.title}
                        </option>
                      ))}
                    </select>
                  </label>,
                  <label htmlFor="house-id" className="row">
                    Дом
                    <input
                      className={`form__input${
                        errors.house && touched.house ? ' form__input_wrong' : ''
                      }`}
                      id="house-id"
                      name="house"
                      type="number"
                      min={0}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.house}
                    />
                  </label>,
                  <label htmlFor="building-id" className="row">
                    Корпус
                    <input
                      className={`form__input${
                        errors.building && touched.building ? ' form__input_wrong' : ''
                      }`}
                      id="building-id"
                      name="building"
                      type="number"
                      min={0}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.building}
                    />
                  </label>,

                  <label htmlFor="apartment-id" className="row">
                    Квартира
                    <input
                      className={`form__input${
                        errors.apartment && touched.apartment ? ' form__input_wrong' : ''
                      }`}
                      id="apartment-id"
                      name="apartment"
                      type="number"
                      min={0}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.apartment}
                    />
                  </label>,
                ]}
            <p className="form__error">
              {(touched.isPaid && errors.isPaid) ||
                (touched.isPickup && errors.isPickup) ||
                (touched.shopId && errors.shopId) ||
                (touched.cityId && errors.cityId) ||
                (touched.streetId && errors.streetId) ||
                (touched.house && errors.house) ||
                (touched.building && errors.building) ||
                (touched.apartment && errors.apartment) ||
                orderError}
            </p>
            <div className="row">
              <Link to="/">
                <button className="auth-button auth-button_logout" type="button">
                  Вернуться на сайт
                </button>
              </Link>
              <button
                className="auth-button auth-button_login"
                type="submit"
                disabled={isSubmitting || !dirty || !isValid}
              >
                Подтвердить заказ
              </button>
            </div>
          </form>
        )}
      </Formik>

      <div className="decoration decoration_dark" />
      {isQrModalShowing ? <QRReader /> : ''}
    </main>
  );
}

Checkout.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onMount: PropTypes.func.isRequired,
  onDiscountApply: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  onCitySelected: PropTypes.bool.isRequired,
  orderError: PropTypes.string,
  discountError: PropTypes.string,
  isConfirmable: PropTypes.bool.isRequired,
  isPickup: PropTypes.bool.isRequired,
  cities: PropTypes.arrayOf(PropTypes.any).isRequired,
  streets: PropTypes.arrayOf(PropTypes.any).isRequired,
  shops: PropTypes.arrayOf(PropTypes.any).isRequired,
  selectedCityId: PropTypes.string,
  isQrModalShowing: PropTypes.bool.isRequired,
};

Checkout.defaultProps = {
  orderError: null,
  discountError: null,
  selectedCityId: null,
};

export default Checkout;
