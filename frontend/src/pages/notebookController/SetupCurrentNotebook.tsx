import * as React from 'react';
import { NotebookRunningState } from '~/types';
import useWatchNotebooksForUsers from '~/utilities/useWatchNotebooksForUsers';
import ApplicationsPage from '~/pages/ApplicationsPage';
import { useSpecificNotebookUserState } from '~/utilities/notebookControllerUtils';
import { NotebookContextStorage, SetNotebookState } from './notebookControllerContextTypes';
import useNamespaces from './useNamespaces';

type SetupCurrentNotebookProps = {
  children: React.ReactNode;
  currentNotebook: NotebookContextStorage['current'];
  setNotebookState: SetNotebookState;
};

const SetupCurrentNotebook: React.FC<SetupCurrentNotebookProps> = ({
  children,
  currentNotebook,
  setNotebookState,
}) => {
  const { notebookNamespace } = useNamespaces();
  const { user: username } = useSpecificNotebookUserState(currentNotebook ?? null);
  const { notebooks, loaded, loadError, forceRefresh, setPollInterval } = useWatchNotebooksForUsers(
    notebookNamespace,
    [username],
  );
  const notebookRunningState: NotebookRunningState | undefined = loaded
    ? notebooks[username]
    : undefined;
  const notebook = notebookRunningState?.notebook;
  const isCurrentlyRunning = notebookRunningState?.isRunning;
  const currentPodUID = notebookRunningState?.podUID;

  React.useEffect(() => {
    if (notebook !== undefined && isCurrentlyRunning !== undefined) {
      setNotebookState((prevState) => ({
        ...prevState,
        current: notebook,
        currentIsRunning: isCurrentlyRunning,
        currentPodUID: currentPodUID || '',
        requestRefresh: (speed?: number) => {
          forceRefresh();
          setPollInterval(speed);
        },
      }));
    }
  }, [
    notebook,
    currentNotebook,
    forceRefresh,
    setNotebookState,
    isCurrentlyRunning,
    setPollInterval,
    currentPodUID,
  ]);

  if (currentNotebook === undefined || loadError) {
    return (
      <ApplicationsPage
        title={loadError ? 'Error loading notebook information' : 'Loading...'}
        description={null}
        loaded={loaded}
        loadError={loadError}
        empty={false}
      />
    );
  }

  return <>{children}</>;
};

export default SetupCurrentNotebook;
