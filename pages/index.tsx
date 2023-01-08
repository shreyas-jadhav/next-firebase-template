import { AppConfig } from '@/utils/config';
import Link from 'next/link';
import React from 'react';

const HomePage = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href={AppConfig.whenNotAuthUrl}>Login</Link>
          </li>
          <li>
            <Link href={AppConfig.whenAuthUrl}>Dashboard</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
