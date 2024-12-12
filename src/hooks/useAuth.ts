import axios from 'axios';
import { useCallback, useState } from 'react';
import { User } from '../types/api/user';
import { useHistory } from 'react-router-dom';

export const useAuth = () => {
  const history = useHistory();
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
            history.push('/home');
          } else {
            alert('ユーザーが見つかりませんでした。');
          }
        })
        .catch(() => alert('ログインできませんでした。'))
        .finally(() => {
          setLoading(false);
        });
    },
    [history]
  );
  return { login, loading };
};
