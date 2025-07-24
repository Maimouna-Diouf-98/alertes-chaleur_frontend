import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from 'lucide-react';

interface FormData {
  type: string;
  region: string;
  threshold: string;
  priority: string;
}

const AddAlertForm: React.FC = () => {
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
          <span>Nouvelle alerte</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter une alerte</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type d'alerte</label>
            <Input {...register('type')} placeholder="Type d'alerte" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Région</label>
            <Input {...register('region')} placeholder="Région" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Seuil</label>
            <Input {...register('threshold')} placeholder="Seuil" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priorité</label>
            <Select {...register('priority')}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une priorité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Haute">Haute</SelectItem>
                <SelectItem value="Moyenne">Moyenne</SelectItem>
                <SelectItem value="Basse">Basse</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Ajouter
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAlertForm;
