import axios from 'axios';
import { useCallback, useState } from 'react';
import { User } from '../types/api/user';
import { useHistory } from 'react-router-dom';
import { useMessage } from './useMessage';

export const useAuth = () => {
  const history = useHistory();
  const { showMessage } = useMessage();

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
            showMessage({ title: 'ログインしました。', status: 'success' });
            history.push('/home');
          } else {
            showMessage({
              title: 'ユーザーが見つかりませんでした。',
              status: 'error',
            });
          }
        })
        .catch(() =>
          showMessage({
            title: 'ログインできませんでした。',
            status: 'error',
          })
        )
        .finally(() => {
          setLoading(false);
        });
    },
    [history, showMessage]
  );
  return { login, loading };
};
