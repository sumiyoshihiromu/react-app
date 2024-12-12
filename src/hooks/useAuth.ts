import axios from 'axios';
import { useCallback, useState } from 'react';
import { User } from '../types/api/user';
import { useHistory } from 'react-router-dom';
import { useMessage } from './useMessage';
import { useLoginUser } from './useLoginUsers';

export const useAuth = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();

  const [loading, setLoading] = useState(false);

  const login = useCallback(
    (id: string, password: string) => {
      setLoading(true);
      if (id == '') {
        alert('IDを入力してください。');
        return;
      }
      if (password == '') {
        alert('パスワードを入力してください。');
        return;
      }
      axios
        .get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => {
          if (id === password && res.data) {
            const isAdmin = res.data.id === 1 ? true : false;
            setLoginUser({ ...res.data, isAdmin });
            showMessage({ title: 'ログインしました。', status: 'success' });
            history.push('/home');
          } else {
            showMessage({
              title: 'ユーザーが見つかりませんでした。',
              status: 'error',
            });
            setLoading(false);
          }
        })
        .catch(() => {
          showMessage({
            title: 'ログインできませんでした。',
            status: 'error',
          });
          setLoading(false);
        });
    },
    [history, showMessage, setLoginUser]
  );
  return { login, loading };
};
