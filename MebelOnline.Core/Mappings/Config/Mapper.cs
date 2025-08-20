using System.Collections;
using Microsoft.Extensions.DependencyInjection;

namespace MebelOnline.Core.Mappings.Config
{
    public class Mapper : IMapper
    {
        private readonly IServiceProvider _serviceProvider;

        public Mapper(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public TTarget Map<TSource, TTarget>(TSource source)
        {
            var sourceType = typeof(TSource);
            var targetType = typeof(TTarget);

            var supportedGenericDefs = new Type[] { typeof(IEnumerable<>), typeof(ICollection<>), typeof(IList<>) };
            var genericDef = supportedGenericDefs.FirstOrDefault(def =>
                sourceType.IsGenericType && sourceType.GetGenericTypeDefinition() == def &&
                targetType.IsGenericType && targetType.GetGenericTypeDefinition() == def);

            bool isCollectionMapping = genericDef != null;

            if (isCollectionMapping)
            {
                var sourceItemType = sourceType.GetGenericArguments()[0];
                var targetItemType = targetType.GetGenericArguments()[0];

                var mapperType = typeof(IMappingService<,>).MakeGenericType(sourceItemType, targetItemType);
                var specificMapper = _serviceProvider.GetRequiredService(mapperType);

                // Always build a List<TTargetItem> (implements all supported interfaces)
                var listType = typeof(List<>).MakeGenericType(targetItemType);
                var targetCollection = Activator.CreateInstance(listType);

                if (source != null)
                {
                    var sourceEnumerable = (IEnumerable)source;
                    var mapMethod = mapperType.GetMethod("Map");

                    foreach (object item in sourceEnumerable)
                    {
                        var mappedItem = mapMethod.Invoke(specificMapper, new object[] { item });
                        // For ICollection/IList, use Add; for IEnumerable, this still works since we return the List as IEnumerable
                        listType.GetMethod("Add").Invoke(targetCollection, new object[] { mappedItem });
                    }
                }

                return (TTarget)targetCollection;
            }
            else
            {
                var specificMapper = _serviceProvider.GetRequiredService<IMappingService<TSource, TTarget>>();

                return specificMapper.Map(source);
            }
        }
    }
}
