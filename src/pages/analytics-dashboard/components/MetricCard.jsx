import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon, 
  color = 'primary',
  description,
  onClick 
}) => {
  const getColorClasses = (colorType) => {
    const colors = {
      primary: 'bg-primary text-primary-foreground',
      success: 'bg-success text-success-foreground',
      warning: 'bg-warning text-warning-foreground',
      error: 'bg-error text-error-foreground',
      accent: 'bg-accent text-accent-foreground'
    };
    return colors?.[colorType] || colors?.primary;
  };

  const getChangeColor = (type) => {
    return type === 'increase' ? 'text-success' : 
           type === 'decrease'? 'text-error' : 'text-muted-foreground';
  };

  const getChangeIcon = (type) => {
    return type === 'increase' ? 'TrendingUp' : 
           type === 'decrease'? 'TrendingDown' : 'Minus';
  };

  return (
    <div 
      className={`bg-card border border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-standard ${
        onClick ? 'cursor-pointer hover-scale' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold text-foreground mb-2">{value}</p>
          
          {change && (
            <div className="flex items-center space-x-1">
              <Icon 
                name={getChangeIcon(changeType)} 
                size={14} 
                className={getChangeColor(changeType)}
              />
              <span className={`text-sm font-medium ${getChangeColor(changeType)}`}>
                {change}
              </span>
              <span className="text-sm text-muted-foreground">vs last period</span>
            </div>
          )}
          
          {description && (
            <p className="text-xs text-muted-foreground mt-2">{description}</p>
          )}
        </div>
        
        <div className={`p-3 rounded-lg ${getColorClasses(color)}`}>
          <Icon name={icon} size={20} />
        </div>
      </div>
    </div>
  );
};

export default MetricCard;