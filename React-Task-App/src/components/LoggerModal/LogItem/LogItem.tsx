import React, { FC } from 'react';
import { ILogItem } from '../../../types';
import { BsFillPersonFill } from 'react-icons/bs';
import { logItemAuthor, logItemDate, logItemMsg, logItemWrapper } from './LogItem.css';

type TLogItemProps = {
  logItem: ILogItem;
}

const LogItem: FC<TLogItemProps> = ({logItem}) => {
  const timeOffset = new Date(Date.now() - Number(logItem.logTimeStamp))
  const showOffsetTime = `
    ${timeOffset.getMinutes() > 0 ? `${timeOffset.getMinutes()}m` : ''} 
    ${timeOffset.getSeconds() > 0 ? `${timeOffset.getSeconds()}s ago` : ''}
    ${timeOffset.getSeconds() === 0 ? `just now` : ''}

  `
  
  return (
    <div className={logItemWrapper}>
      <div className={logItemAuthor}>
        <BsFillPersonFill />
        {logItem.logAuthor}
      </div>
      <div className={logItemMsg}>{logItem.logMessage}</div>
      <div className={logItemDate}>{showOffsetTime}</div>
    </div>
  );
};

export default LogItem;