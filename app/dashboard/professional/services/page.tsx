'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { fakeProfessionalData } from '@/lib/fake-data';
import { Plus, Clock, Euro, Video, MapPin, CreditCard as Edit, Trash2 } from 'lucide-react';

export default function ServicesPage() {
  const [services, setServices] = useState(fakeProfessionalData.services);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    duration: 30,
    price: 50,
    mode: ['Présentiel'],
    description: '',
    active: true,
  });

  const handleToggleActive = (serviceId: string) => {
    setServices(
      services.map((service) =>
        service.id === serviceId ? { ...service, active: !service.active } : service
      )
    );
  };

  const handleEdit = (service: any) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      duration: service.duration,
      price: service.price,
      mode: service.mode,
      description: service.description,
      active: service.active,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (serviceId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
      setServices(services.filter((service) => service.id !== serviceId));
    }
  };

  const handleSubmit = () => {
    if (editingService) {
      setServices(
        services.map((service) =>
          service.id === editingService.id ? { ...service, ...formData } : service
        )
      );
    } else {
      const newService = {
        id: (services.length + 1).toString(),
        ...formData,
      };
      setServices([...services, newService]);
    }
    setIsDialogOpen(false);
    setEditingService(null);
    setFormData({
      name: '',
      duration: 30,
      price: 50,
      mode: ['Présentiel'],
      description: '',
      active: true,
    });
  };

  const totalActive = services.filter((s) => s.active).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mes Services</h1>
          <p className="text-muted-foreground">
            {services.length} services • {totalActive} actifs
          </p>
        </div>
        <Button
          className="bg-[#00A67E] hover:bg-[#00A67E]/90"
          onClick={() => {
            setEditingService(null);
            setFormData({
              name: '',
              duration: 30,
              price: 50,
              mode: ['Présentiel'],
              description: '',
              active: true,
            });
            setIsDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Nouveau service
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id} className={!service.active ? 'opacity-60' : ''}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <CardDescription className="mt-1">{service.description}</CardDescription>
                </div>
                <Switch
                  checked={service.active}
                  onCheckedChange={() => handleToggleActive(service.id)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{service.duration} minutes</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Euro className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold">{service.price}€</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {service.mode.map((m) => (
                    <Badge key={m} variant="secondary" className="text-xs">
                      {m === 'En ligne' ? (
                        <>
                          <Video className="mr-1 h-3 w-3" />
                          {m}
                        </>
                      ) : (
                        <>
                          <MapPin className="mr-1 h-3 w-3" />
                          {m}
                        </>
                      )}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleEdit(service)}
                  >
                    <Edit className="mr-1 h-3 w-3" />
                    Modifier
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(service.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingService ? 'Modifier le service' : 'Nouveau service'}</DialogTitle>
            <DialogDescription>
              Définissez les détails de votre consultation
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du service</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="ex: Consultation standard"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Décrivez votre service..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Durée (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Tarif (€)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Mode de consultation</Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.mode.includes('Présentiel')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, mode: [...formData.mode, 'Présentiel'] });
                      } else {
                        setFormData({
                          ...formData,
                          mode: formData.mode.filter((m) => m !== 'Présentiel'),
                        });
                      }
                    }}
                    className="rounded"
                  />
                  <span className="text-sm">Présentiel</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.mode.includes('En ligne')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, mode: [...formData.mode, 'En ligne'] });
                      } else {
                        setFormData({
                          ...formData,
                          mode: formData.mode.filter((m) => m !== 'En ligne'),
                        });
                      }
                    }}
                    className="rounded"
                  />
                  <span className="text-sm">En ligne</span>
                </label>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="active">Service actif</Label>
              <Switch
                id="active"
                checked={formData.active}
                onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSubmit} className="bg-[#00A67E] hover:bg-[#00A67E]/90">
              {editingService ? 'Enregistrer' : 'Créer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
