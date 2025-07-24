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
  code: string;
  stations: number;
  coverage: string;
}

const AddRegionForm: React.FC = () => {
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
          <span>Ajouter une région</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter une région</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
            <Input {...register('name')} placeholder="Nom" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Code</label>
            <Input {...register('code')} placeholder="Code" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Stations</label>
            <Input {...register('stations')} type="number" placeholder="Stations" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Couverture</label>
            <Input {...register('coverage')} placeholder="Couverture" />
          </div>
          <Button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Ajouter
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRegionForm;
