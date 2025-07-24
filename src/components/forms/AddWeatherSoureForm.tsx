import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from 'lucide-react';

interface FormData {
  name: string;
  url: string;
  description: string;
}

const AddWeatherSourceForm: React.FC = () => {
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
          <span>Ajouter une source</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter une source de données météo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
            <Input {...register('name')} placeholder="Nom de la source" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
            <Input {...register('url')} placeholder="URL de la source" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <Input {...register('description')} placeholder="Description de la source" />
          </div>
          <Button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Ajouter
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddWeatherSourceForm;
