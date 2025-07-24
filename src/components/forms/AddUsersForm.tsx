import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  role: string;
  region: string;
}

const AddUserForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus size={20} />
          <span>Ajouter un utilisateur</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un utilisateur</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
            <Input {...register('name')} placeholder="Nom" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <Input {...register('email')} type="email" placeholder="Email" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rôle</label>
            <Select {...register('role')}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Agriculteur">Agriculteur</SelectItem>
                <SelectItem value="Pêcheur">Pêcheur</SelectItem>
                <SelectItem value="Météorologue">Météorologue</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Région</label>
            <Input {...register('region')} placeholder="Région" />
          </div>
          <Button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Ajouter
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserForm;
