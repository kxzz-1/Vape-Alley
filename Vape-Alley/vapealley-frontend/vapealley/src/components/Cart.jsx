import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';

const Cart = ({ isOpen, onClose, cartItems = [], onRemove, onUpdateQuantity }) => {
  // Calculate the subtotal
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const formatPrice = (num) => `Rs ${num.toLocaleString()}`;

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-background bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-background shadow-xl">
                    {/* Cart Header */}
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-accent">
                          Shopping Cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-accent"
                            onClick={onClose}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      {/* Cart Items List */}
                      <div className="mt-8">
                        <div className="flow-root">
                          {cartItems.length > 0 ? (
                            <ul role="list" className="-my-6 divide-y divide-gray-700">
                              {cartItems.map((item) => (
                                <li key={item.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-700">
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>
                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-200">
                                        <h3><Link to={`/product/${item.id}`} onClick={onClose}>{item.name}</Link></h3>
                                        <p className="ml-4">{formatPrice(item.price * item.quantity)}</p>
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-400">Qty {item.quantity}</p>
                                      <div className="flex">
                                        <button
                                          onClick={() => onRemove(item.id)}
                                          type="button"
                                          className="font-medium text-primary hover:text-primary-hover"
                                        >
                                          <TrashIcon className="h-5 w-5" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-center text-gray-400">Your cart is empty.</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Cart Footer */}
                    {cartItems.length > 0 && (
                      <div className="border-t border-gray-700 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-200">
                          <p>Subtotal</p>
                          <p>{formatPrice(subtotal)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-400">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <Link
                            to="/checkout"
                            onClick={onClose}
                            className="flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-hover"
                          >
                            Checkout
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Cart;