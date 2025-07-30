import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';

interface FilterState {
  search: string;
  status: string;
  dateRange: {
    from?: Date;
    to?: Date;
  };
  organization: string;
}

interface AdvancedFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onReset: () => void;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  filters,
  onFiltersChange,
  onReset,
}) => {
  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const hasActiveFilters = 
    filters.search || 
    filters.status || 
    filters.organization || 
    filters.dateRange.from || 
    filters.dateRange.to;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Filters</CardTitle>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onReset}>
            <X className="h-4 w-4 mr-1" />
            Reset
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="text-sm font-medium mb-2 block">Search</label>
            <Input
              placeholder="Email, name, or ID..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
            />
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium mb-2 block">Status</label>
            <Select value={filters.status} onValueChange={(value) => updateFilter('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="incomplete">Incomplete</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Organization */}
          <div>
            <label className="text-sm font-medium mb-2 block">Organization</label>
            <Input
              placeholder="e.g., Acme Corporation"
              value={filters.organization}
              onChange={(e) => updateFilter('organization', e.target.value)}
            />
          </div>

          {/* Date Range */}
          <div>
            <label className="text-sm font-medium mb-2 block">Date Range</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.dateRange.from ? (
                    filters.dateRange.to ? (
                      <>
                        {format(filters.dateRange.from, "LLL dd, y")} -{" "}
                        {format(filters.dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(filters.dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={filters.dateRange.from}
                  selected={filters.dateRange.from && filters.dateRange.to ? { from: filters.dateRange.from, to: filters.dateRange.to } : undefined}
                  onSelect={(range) => updateFilter('dateRange', range || {})}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2">
            {filters.search && (
              <Badge variant="secondary">
                Search: {filters.search}
                <X
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() => updateFilter('search', '')}
                />
              </Badge>
            )}
            {filters.status && (
              <Badge variant="secondary">
                Status: {filters.status}
                <X
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() => updateFilter('status', '')}
                />
              </Badge>
            )}
            {filters.organization && (
              <Badge variant="secondary">
                Organization: {filters.organization}
                <X
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() => updateFilter('organization', '')}
                />
              </Badge>
            )}
            {(filters.dateRange.from || filters.dateRange.to) && (
              <Badge variant="secondary">
                Date Range
                <X
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() => updateFilter('dateRange', {})}
                />
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};