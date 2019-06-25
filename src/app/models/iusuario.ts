interface IRol {
  editor?: boolean;
  admin?: boolean;
}

export interface IUsuario {
  id?: string;
  nombre?: string;
  email?: string;
  password?: string;
  photoUrl?: string;
  roles: IRol;
}
