'use client';

import { Menu, Popover } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { signOut } from 'next-auth/react';

function NavBar() {
  const session = useSession();
  let lowerText =
    <Link href="/auth/signIn" className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-700">
    Sign In / Sign Up <span aria-hidden="true">&rarr;</span>
    </Link>;

  if (session.status === "authenticated") {
    lowerText =
    // <Link href="/auth/signOut"
    // className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-700">
    // {session.data.user?.name} | Sign Out<span aria-hidden="true">&rarr;</span>
    // </Link>;

    /*<Link href="/auth/signOut"
    className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-700">
    {session.data.user?.name} | Sign Out<span aria-hidden="true">&rarr;</span>
    </Link>;*/
    <Menu> 
      <Menu.Button className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-700">
        {session.data.user?.name} <span aria-hidden="true">&rarr;</span> 
      </Menu.Button>
      <Menu.Items className="text-sm font-semibold leading-6 text-gray-900">
        <Menu.Item>
          {({ active }) => (
            <a
              className='hover:text-blue-700'
              href="/profile"
            >
              View Profile  |
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              className='hover:text-blue-700'
              href="/auth/signOut"
            >
               |  Sign Out
            </a>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>

  }
  return (
    <header>
    <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div className="flex lg:flex-1">
          <Link href='/'>
            <Image src="/BB_icon.png" alt="" width={50} height={50} />
          </Link>
      </div>
      <Popover.Group className="hidden lg:flex lg:gap-x-20">
        <Popover>
          <Link href="/MarketplacePage" className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-700">
            Marketplace
            {/* <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" /> */}
          </Link>

          {/* <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
              <div className="p-4">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                  >
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                    </div>
                    <div className="flex-auto">
                      <a href={item.href} className="block font-semibold text-gray-900">
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                {callsToAction.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                  >
                    <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                    {item.name}
                  </a>
                ))}
              </div>
            </Popover.Panel>
          </Transition> */}
        </Popover>

        <Link href="/ProductRequestPage" className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-700">
          List a Product
        </Link>
        <Link href="#" className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-700">
          Hot Buys
        </Link>
        <Link href="#" className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-700">
          About
        </Link>
      </Popover.Group>
      
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
      {lowerText}
      </div>
    </nav>
  </header>
  );
}

export default NavBar;