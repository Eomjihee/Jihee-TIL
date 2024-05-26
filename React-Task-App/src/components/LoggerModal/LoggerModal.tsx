import React, { FC } from 'react';
import { FiX } from 'react-icons/fi';
import LogItem from './LogItem/LogItem';
import { useTypedSelector } from '../../hooks/redux';
import { logMdalBody, logMdalCloseBtn, logMdalHeader, logMdalTitle, logMdalWindow, logMdalWrapper } from './LoggerModal.css';

type TLoggerModalProps = {
  setIsLoggerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoggerModal: FC<TLoggerModalProps> = ({
  setIsLoggerOpen
}) => {
  const logs = useTypedSelector(state => state.logger.logArray);
  return (
    <div className={logMdalWrapper}>
      <div className={logMdalWindow}>
        <div className={logMdalHeader}>
          <div className={logMdalTitle}>활동 기록</div>
          <FiX className={logMdalCloseBtn} onClick={() => setIsLoggerOpen(false)} />
        </div>
        <div className={logMdalBody}>
          {logs.map((log) => (
            <LogItem key={log.logId} logItem={log} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoggerModal;